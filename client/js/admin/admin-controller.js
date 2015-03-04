function AdminCtrl ($scope,$window) {
  $scope.sidebarShow = (document.body.clientWidth >= 768);
  $scope.sidebarToggle = function () {
    $scope.sidebarShow = !$scope.sidebarShow;
  };
  $scope.redirectToHomapage = function () {
    $window.location = '/index.html';
  }
  $scope.logOut = function () {
    $window.localStorage.removeItem('accessToken');
    $window.localStorage.removeItem('userId');
    $window.localStorage.removeItem('loginTime');
    $window.location = '/login.html';
  }
}

function SidebarCtrl ($scope,$window,$routeParams) {
  $scope.sidebars = [
    {
      'id':'sidebarHome',
      'display_name':'首页',
      'url':'#/home',
      'active':$window.location.hash==='#/home' || !($window.location.hash==='#/form/list' || $window.location.hash==='#/seckill/list' || $window.location.hash==='#/vote/list' || $window.location.hash==='#/luck/list' || $window.location.hash==='#/wechat' || $window.location.hash==='#/setting' || $window.location.hash==='#/help')
    },
    {
      'id':'sidebarForm',
      'display_name':'表单',
      'url':'#/form/list',
      'active':$window.location.hash==='#/form/list'
    },
    {
      'id':'sidebarSeckill',
      'display_name':'疯抢',
      'url':'#/seckill/list',
      'active':$window.location.hash==='#/seckill/list'
    },
    {
      'id':'sidebarVote',
      'display_name':'投票',
      'url':'#/vote/list',
      'active':$window.location.hash==='#/vote/list'
    },
    {
      'id':'sidebarLuck',
      'display_name':'抽奖',
      'url':'#/luck/list',
      'active':$window.location.hash==='#/luck/list'
    },
    {
      'id':'sidebarWechat',
      'display_name':'微信',
      'url':'#/wechat',
      'active':$window.location.hash==='#/wechat'
    },
    {
      'id':'sidebarSetting',
      'display_name':'设置',
      'url':'#/setting',
      'active':$window.location.hash==='#/setting'
    },
    {
      'id':'sidebarHelp',
      'display_name':'帮助',
      'url':'#/help',
      'active':$window.location.hash==='#/help'
    }
  ];
  $scope.redirect = function(index) {
    for (var i = 0; i < $scope.sidebars.length; i++) {
      $scope.sidebars[i].active = false;
    };
    $scope.sidebars[index].active = true;
    $window.location.hash = $scope.sidebars[index].url;
  };
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
    $window.location.hash = '#/'+$routeParams.type+'/edit/'+id;
  };
  $scope.result = function (id) {
    $window.location.hash = '#/'+$routeParams.type+'/result/'+id;
  };
  $scope.remove = function (index,id) {
    List.delete({fk:id},
      function(res){
        $scope.listItems.splice(index,1);
      },
      function(res){
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
  var Edit = $resource(editProperty[$routeParams.type],{userId:$window.localStorage.getItem('userId')});
  /* 初始化区
   * initEdit()为新建页面时初始化通用部分的函数
   * loadEdit()为编辑页面时对于已有信息的加载
   * 在函数中其中分成两部分，顺序结构部分用于初始化通用部分，switch结构用于初始化功能特定的部分
   * intial()决定将edit页面初始化为“新建”还是编辑“编辑”，以及实现对初始化函数的调用
   */
  var loadEdit = function () {
    Edit.get({fk:$routeParams.id},
      function(res){
        $scope.title = res.title;
        $scope.description = res.description;
        $scope.startTime = new Date(res.startTime);
        $scope.startDate = new Date(res.startTime);
        $scope.startDate.toString = function(){
          return this.getFullYear()+'年'+(this.getMonth()+1)+'月'+this.getDate()+'日 ';
        };
        $scope.stopTime = new Date(res.stopTime);
        $scope.stopDate = new Date(res.stopTime);
        $scope.stopDate.toString = function(){
          return this.getFullYear()+'年'+(this.getMonth()+1)+'月'+this.getDate()+'日 ';
        };
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
      }
    );
  };
  var initial = function () {
    $routeParams.id === 'create'?initEdit():loadEdit();
    $scope.enType = $routeParams.type;
    $scope.cnType = dict[$routeParams.type];
    $scope.mode = $routeParams.id === 'create'?('新建'+$scope.cnType+' '):('编辑'+$scope.cnType+' ');
    $scope.submitButtonName = $routeParams.id === 'create'?'创建':'更新';
  };
  initial();
  /* 日期选择器配置
   * DATEPICKER组件调用参数
   */
  $scope.enFormat = "EEE MMM dd yyyy HH:mm:ss 'GMT'Z '(CST)'";
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  $scope.unFormat = "yyyy-MM-dd HH:mm";  
  $scope.cnDateFormat = "yyyy'年'M'月'd'日";

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.startDateOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startOpened = true;
  };
  $scope.stopDateOpen = function($event) {
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
  $scope.moveUpForm = function (index) {
    if (index > 0) {
      $scope.forms.splice(index-1,0,$scope.forms.splice(index,1)[0]);
    };
  };
  $scope.moveDownForm = function (index) {
    if (index < $scope.forms.length) {
      $scope.forms.splice(index+1,0,$scope.forms.splice(index,1)[0]);
    };
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
    var startTmp = new Date($scope.startDate.getFullYear(),$scope.startDate.getMonth(),$scope.startDate.getDate(),$scope.startTime.getHours(),$scope.startTime.getMinutes());
    var stopTmp = new Date($scope.stopDate.getFullYear(),$scope.stopDate.getMonth(),$scope.stopDate.getDate(),$scope.stopTime.getHours(),$scope.stopTime.getMinutes());
    var uploadParameters = {
      'title': $scope.title,
      'description':$scope.description,
      'startTime': startTmp.toISOString(),
      'stopTime': stopTmp.toISOString(),
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
      Edit.update({fk:$routeParams.id},uploadParameters);
    }
    var mode = $routeParams.id === 'create'?'创建':'更新';
    alert(mode+$scope.cnType+'成功！');
    $window.location.hash = '#/'+$routeParams.type+'/list';
  };
  $scope.preview = function(){
  };
}

function ResultCtrl ($scope,$routeParams,$resource,$window,dict) {
  /* 结果页面配置区 
   * 用于设置结果页面的各项显示上的差异化配置。
   */
  var resultConfig = {
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
  /* 接口区
   * 结果页面上的各项接口。
   */
  var resultProperty = {
    form:'/api/Forms/:id/results',
    seckill:'',
    vote:'/api/Votes/:id/results',
    luck:''
  };
  var infoProperty = {
    form:'/api/OrganizationUsers/:userId/forms/:fk',
    seckill:'/api/OrganizationUsers/:userId/seckills/:fk',
    vote:'/api/OrganizationUsers/:userId/votes/:fk',
    luck:'/api/OrganizationUsers/:userId/lucks/:fk'
  };
  var Result = $resource(resultProperty[$routeParams.type],{id:$routeParams.id});
  var Info = $resource(infoProperty[$routeParams.type],{userId:$window.localStorage.getItem('userId'),fk:$routeParams.id});
  
  /* 页面ViewModel区
   * 用于直接和页面上绑定的各项变量
   */
  $scope.mode = dict[$routeParams.type]+'结果 ';
  $scope.title = '';
  $scope.currentResultConfig = resultConfig[$routeParams.type];
  $scope.results = [];
  $scope.resultHeaders = [];
  $scope.info = {};
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  /* 结果处理区
   * 将各种不同的结果显示到同一张表格中，处理收到的各类不同的json。
   */
  var resultsProcess = function (res) {
    switch ($routeParams.type) {
      case 'form':
        for (var i = 0; i < res.length; i++) {
          var resultTmp = [];
          var answersTmp = res[i].formResultAnswers;
          for (var j = 0; j < answersTmp.length; j++) {
            resultTmp.push(answersTmp[j].content);
          }
          $scope.results.push(resultTmp);
        }
        break;
      case 'seckill':break;
      case 'vote':break;
      case 'luck':break;
    };
  };
  var infoProcess = function (res) {
    switch ($routeParams.type) {
      case 'form':
        $scope.title = res.title;
        $scope.startTime = res.startTime;
        $scope.stopTime = res.stopTime;
        $scope.resultHeaders.push('序号');
        for (var i = 0; i < res.formQuestions.length; i++) {
          $scope.resultHeaders.push(res.formQuestions[i].label);
        };
        break;
      case 'seckill':break;
      case 'vote':
        $scope.title = res.title;
        $scope.startTime = res.startTime;
        $scope.stopTime = res.stopTime;
        break;
      case 'luck':break;
    };
  }
  /* 结果页面的获取区
   * 在这个区域中包括了所有的请求。
   */
  Info.get(
    {},
    function (res) {
      infoProcess(res);
    },
    function (res) {}
  );
  Result.query(
    {},
    function (res) {
      resultsProcess(res);
    },
    function (res) {}
  );
}

function HomeCtrl ($scope) {
  $scope.notices = [
    {
      'title':'招新系统上线啦',
      'time':'2012年2月12日',
      'content':'习近平《在中央新疆工作座谈会上的讲话》【典出】子曰：“危者，安其位者也。亡者，保其存者也。乱者，有其治者也。是故君子安而不忘危，存而不忘亡，治而不忘乱，是以身安而国家可保也。” ——《周易?系辞下》'
    },
    {
      'title':'招新系统上线啦',
      'time':'2012年2月12日',
      'content':'【解读】《周易》亦称《易经》，儒家重要经典之一。《周易?系辞》是孔子阐释易理的文字，这段的意思是，君子在国家安定的时候要不忘危险，国家存在的时候要不忘败亡，国家大治的时候要不忘变乱。'
    },
    {
      'title':'招新系统上线啦',
      'time':'2012年2月12日',
      'content':'这种忧患和责任意识是习近平治国理政的重要思想底色。“全党必须警醒起来”，2012年习近平一上任就为全党敲响了警钟。紧接着，习近平发出“整风”动员令，并从生死存亡的高度来认识和解决腐败问题。在党的群众路线教育实践活动总结大会上，习近平引用《道德经》中的名句“为之于未有，治之于未乱”再次告诫全党要增强忧患意识，学会“下先手棋”，方能立于不败。'
    },
    {
      'title':'招新系统上线啦',
      'time':'2012年2月12日',
      'content':'这种忧患和责任意识是习近平治国理政的重要思想底色。“全党必须警醒起来”，2012年习近平一上任就为全党敲响了警钟。紧接着，习近平发出“整风”动员令，并从生死存亡的高度来认识和解决腐败问题。在党的群众路线教育实践活动总结大会上，习近平引用《道德经》中的名句“为之于未有，治之于未乱”再次告诫全党要增强忧患意识，学会“下先手棋”，方能立于不败。'
    }
  ]
}

function WechatCtrl () {}
function SettingCtrl () {}
function HelpCtrl () {}
