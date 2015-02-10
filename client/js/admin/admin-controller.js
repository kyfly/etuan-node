function SidebarCtrl ($scope,$window) {
  $scope.sidebars = [
    {
      'id':'sidebarHome',
      'display_name':'首页',
      'url':'#/home'
    },
    {
      'id':'sidebarForm',
      'display_name':'表单',
      'url':'#/form/list'
    },
    {
      'id':'sidebarSeckill',
      'display_name':'疯抢',
      'url':'#/seckill/list'
    },
    {
      'id':'sidebarVote',
      'display_name':'投票',
      'url':'#/vote/list'
    },
    {
      'id':'sidebarLuck',
      'display_name':'抽奖',
      'url':'#/luck/list'
    },
    {
      'id':'sidebarWechat',
      'display_name':'微信',
      'url':'#/wechat'
    },
    {
      'id':'sidebarSetting',
      'display_name':'设置',
      'url':'#/setting'
    },
    {
      'id':'sidebarHelp',
      'display_name':'帮助',
      'url':'#/help'
    }
  ];
  $scope.redirect = function(href) {
    $window.location.href = href;
  }
}

function ListCtrl ($window,$scope,$routeParams,$resource) {
  var listProperty = {
    form:'/api/OrganizationUsers/:userId/forms/:fk',
    seckill:'/api/OrganizationUsers/:userId/seckills/:fk',
    vote:'/api/OrganizationUsers/:userId/votes/:fk',
    luck:'/api/OrganizationUsers/:userId/lucks/:fk'
  };
  var List = $resource(listProperty[$routeParams.type],{userId:$window.localStorage.getItem('userId')});
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  $scope.listItems = List.query();
  $scope.edit = function (id) {
    $window.location.href = '#/'+$routeParams.type+'/edit/'+id;
  };
  $scope.result = function (id) {
    $window.location.href = '#/'+$routeParams.type+'/result/'+id;
  };
  $scope.remove = function (index,elementId) {
    List.delete({fk:elementId},
      function(res){
        console.log(res);
        $scope.listItems.splice(index,1);
      },
      function(res){
        console.log(res);
      }
    );
  }
}

function EditCtrl ($scope,$routeParams,$resource,$window,dict) {
  /* 接口资源区
   * 在editProperty中定义了所有需要编辑的功能的但页面编辑时所调用的接口名（字符串类型）
   * 其中:userId用于占位用户的ID，fk为外键，占位具体页面的ID
   * 以editProperty[功能类型]的方式进行调用
   * Edit为一个资源对象，实现所有的CRUD的基础
   */
  var editProperty = {
    form:'/api/OrganizationUsers/:userId/forms/:fk',
    seckill:'/api/OrganizationUsers/:userId/seckills/:fk',
    vote:'/api/OrganizationUsers/:userId/votes/:fk',
    luck:'/api/OrganizationUsers/:userId/lucks/:fk'
  };
  var Edit = $resource(editProperty[$routeParams.type],{userId:$window.localStorage.getItem('userId'),fk:'@elementId'});
  /* 初始化区
   * initEdit()为新建页面时初始化通用部分的函数
   * loadEdit()为编辑页面时对于已有信息的加载
   * 在函数中其中分成两部分，顺序结构部分用于初始化通用部分，switch结构用于初始化功能特定的部分
   * intial()决定将edit页面初始化为“新建”还是编辑“编辑”，以及实现对初始化函数的调用
   */
  var initEdit = function () {
    $scope.startTime = new Date();
    $scope.stopTime = new Date();
  }
  var loadEdit = function () {
    Edit.get({fk:$routeParams.id},
      function(res){
        $scope.title = res.title;
        $scope.description = res.description;
        $scope.startTime = new Date(res.startTime);
        $scope.stopTime = new Date(res.stopTime);
        $scope.verifyRule = res.verifyRule;
        switch ($routeParams.type){
          case 'form':
            $scope.forms = res.formQuestions;
            break;
          case 'seckill':
            break;
          case 'vote':
            $scope.votes = res.voteSubitems;
            break;
          case 'luck':
            break;
        }
      },
      function(res){
        console.log(res);
      }
    );
  };
  var initial = function () {
    $routeParams.id === 'create'?initEdit():loadEdit();
    $scope.enType = $routeParams.type;
    $scope.cnType = dict[$routeParams.type];
    $scope.mode = $routeParams.id === 'create'?('新建'+$scope.cnType):('编辑'+$scope.cnType);
    $scope.submitButtonName = $routeParams.id === 'create'?'创建':'更新';
  };
  initial();
  /* 日期选择器配置
   * DATEPICKER组件调用参数
   */
  $scope.enFormat = "EEE MMM dd yyyy HH:mm:ss 'GMT'Z '(CST)'";
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.startTimeOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startOpened = true;
  };
  $scope.stopTimeOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.stopOpened = true;
  };
  /* 时间选择器配置
   * 用于设置鼠标滚轮时，滚动的单步步长
   */
  $scope.hstep = 1;
  $scope.mstep = 15;
  /* 功能检测区
   * 将功能类型转化为相应的布尔类型，配合前端view中需要布尔类型的参数调用
   */
  $scope.isForm = function () {
    return 'form' === $routeParams.type;
  };
  $scope.isSkeckill = function () {
    return 'skeckill' === $routeParams.type;
  };
  $scope.isVote = function () {
    return 'vote' === $routeParams.type;
  };
  $scope.isLuck = function () {
    return 'luck' === $routeParams.type;
  };
  /* 表单特定功能区
   * 实现了表单项目的CRUD，对于选择题等拥有content[]项目的表单项目，还实现了对具体选项的CRUD操作。
   * 其实现原理为将表单结构与forms对象实现双向绑定
   */
  $scope.forms = [];
  $scope.addForm = {
    choice:function () {
      $scope.forms.push({
        type:1,
        label:'请选择你的答案',
        content:['A-','B-','C-','D-']
      });
    },
    simple:function () {
      $scope.forms.push({
        type:2,
        label:'请简答你的答案',
        content:[]
      });
    },
    complex:function () {
      $scope.forms.push({
        type:3,
        label:'请陈述你的答案',
        content:[]
      });
    },
    judge:function () {
      $scope.forms.push({
        type:4,
        label:'请判断你的答案',
        content:['是','否']
      });
    }
  };
  $scope.removeForm = function (index) {
    $scope.forms.splice(index,1);
  };
  $scope.showType = ['','选择题','简答题','陈述题','判断题'];
  $scope.showContent = ['',true,false,false,false];
  $scope.appendContent = function (index) {
    $scope.forms[index].content.push('');
  };
  $scope.removeContent = function (pindex,index) {
    $scope.forms[pindex].content.splice(index,1);
  };

  $scope.votes = [];
  $scope.addVote = function () {
    $scope.votes.push({
      'name':'',
      'detailUrl':'',
      count:0
    });
  }

  /* 提交区
   * 用于提交数据，uploadParameter中首先加入通用部分的参数，然后根据switch结构向其中分别添加特定部分的参数
   * 在完成提交后，将转跳至列表页面list.html
   */
  $scope.submit = function () {
    var nowTime = new Date();
    var uploadParameters = {
      'title': $scope.title,
      'description':$scope.description,
      'startTime': $scope.startTime.toISOString(),
      'stopTime': $scope.stopTime.toISOString(),
      'adPicture': '',
      'adUrl': '',
      'verifyRule': $scope.verifyRule,
      'updatedAt': nowTime.toISOString()
    }
    switch ($routeParams.type){
      case 'form':
        var formQuestionsTmp = [];
        for(var i=0;i<$scope.forms.length;i++){
          var formQuestion = {
            'id':i,
            'type': $scope.forms[i].type,
            'label': $scope.forms[i].label,
            'content': $scope.forms[i].content
          };
          formQuestionsTmp.push(formQuestion);
        }
        uploadParameters.formQuestions = formQuestionsTmp;
        break;
      case 'seckill':
        break;
      case 'vote':
        var voteSubitemsTmp = [];
        for(var i=0;i<$scope.votes.length;i++){
          var voteSubitem = {
            'id':i,
            'name': $scope.votes[i].name,
            'detailUrl': $scope.votes[i].detailUrl,
            'count': $scope.votes[i].count
          };
          voteSubitemsTmp.push(voteSubitem);
        }
        uploadParameters.voteSubitems = voteSubitemsTmp;
        break;
      case 'luck':
        break;
    }
    if($routeParams.id === 'create'){
      Edit.save(uploadParameters);
    }
    else{
      uploadParameters.elementId = $routeParams.id;
      Edit.update(uploadParameters);
    }
    var mode = $routeParams.id === 'create'?'创建':'更新';
    alert(mode+$scope.cnType+'成功！');
    $window.location.href = '#/'+$routeParams.type+'/list';
  };
  $scope.preview = function(){
  };
}

function ResultCtrl ($scope,$routeParams,$resource,dict) {
  $scope.mode = dict[$routeParams.type]+'结果'+'  '+$routeParams.id;
  var resultProperty = {
    form:{
      downloadAsExcel:true,
      downloadAsPdf:true
    },
    seckill:{
      downloadAsExcel:true,
      downloadAsPdf:false
    },
    vote:{
      downloadAsExcel:true,
      downloadAsPdf:false
    },
    luck:{
      downloadAsExcel:true,
      downloadAsPdf:false
    }
  };
}

function HomeCtrl () {}
function WechatCtrl () {}
function SettingCtrl () {}
function HelpCtrl () {}
