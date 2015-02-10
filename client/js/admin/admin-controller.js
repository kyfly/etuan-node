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
  //接口资源区
  var editProperty = {
    form:'/api/OrganizationUsers/:userId/forms/:fk',
    seckill:'/api/OrganizationUsers/:userId/seckills/:fk',
    vote:'/api/OrganizationUsers/:userId/votes/:fk',
    luck:'/api/OrganizationUsers/:userId/lucks/:fk'
  };
  var Edit = $resource(editProperty[$routeParams.type],{userId:$window.localStorage.getItem('userId'),fk:'@elementId'});
  var initEdit = function () {
    $scope.startTime = new Date();
    $scope.stopTime = new Date();
  }
  var loadEdit = function () {
    Edit.get({fk:$routeParams.id},
      function(res){
        $scope.title = res.title;
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
    $scope.mode = $routeParams.id === 'create'?('新建'+dict[$routeParams.type]):('编辑'+dict[$routeParams.type]+'  '+$routeParams.id);
    $scope.submitButtonName = $routeParams.id === 'create'?'创建':'更新';
  };
  initial();
  //日期选择器配置
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
  //时间选择器配置
  $scope.hstep = 1;
  $scope.mstep = 15;
  //功能检测区
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
  //表单
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
  //提交区
  $scope.submit = function () {
    var formQuestions = [];
    for(var i=0;i<$scope.forms.length;i++){
      var formQuestion = {
        'id':i,
        'type': $scope.forms[i].type,
        'label': $scope.forms[i].label,
        'content': $scope.forms[i].content
      };
      formQuestions.push(formQuestion);
    }
    var nowTime = new Date();
    if($routeParams.id === 'create'){
      Edit.save({
        'title': $scope.title,
        'startTime': $scope.startTime.toISOString(),
        'stopTime': $scope.stopTime.toISOString(),
        'adPicture': '',
        'adUrl': '',
        'verifyRule': $scope.verifyRule,
        'updatedAt': nowTime.toISOString(),
        'formQuestions':formQuestions
      });
    }
    else{
      Edit.update({
        'elementId':$routeParams.id,
        'title': $scope.title,
        'startTime': $scope.startTime.toISOString(),
        'stopTime': $scope.stopTime.toISOString(),
        'adPicture': '',
        'adUrl': '',
        'verifyRule': $scope.verifyRule,
        'updatedAt': nowTime.toISOString(),
        'formQuestions':formQuestions
      });
    }
    var mode = $routeParams.id === 'create'?'创建':'更新';
    alert(mode+dict[$routeParams.type]+'成功！');
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
