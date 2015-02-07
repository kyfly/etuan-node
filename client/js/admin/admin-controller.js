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
    /*
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
    */
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
    form:'/api/OrganizationUsers/:id/forms',
    seckill:'/api/OrganizationUsers/:id/seckills',
    vote:'/api/OrganizationUsers/:id/votes',
    luck:'/api/OrganizationUsers/:id/lucks'
  };
  //var List = $resource(listProperty[$routeParams.type]);
  //$scope.listItems = List.query({'id':$window.localStorage.getItem('userId')});
  var List = $resource('/api/Forms');
  $scope.listItems = List.query();
  /*
  $scope.listItems = [
    {
      'name':'项目一号',
      'id':'1',
      'startTime':'1970-00-00 00:00:00',
      'stopTime':'1990-00-00 00:00:00'
    },
    {
      'name':'项目二号',
      'id':'2',
      'startTime':'1970-00-00 00:00:00',
      'stopTime':'1990-00-00 00:00:00'
    },
    {
      'name':'项目三号',
      'id':'3',
      'startTime':'1970-00-00 00:00:00',
      'stopTime':'1990-00-00 00:00:00'
    }
  ];
  */
  $scope.edit = function (id) {
    $window.location.href = '#/'+$routeParams.type+'/edit/'+id;
  };
  $scope.result = function (id) {
    $window.location.href = '#/'+$routeParams.type+'/result/'+id;
  };
  $scope.remove = function (index,id) {
    $scope.listItems.splice(index,1);
    List.delete({'id':id});
  }
}

function EditCtrl ($scope,$routeParams,$resource,$window) {
  console.log($routeParams);
  //日期选择器配置
  $scope.createMode = false;
  $scope.format = 'yyyy-MM-dd';
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.startDateOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startDateOpened = true;
  };
  $scope.stopDateOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.stopDateOpened = true;
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
  //接口资源区
  var editProperty = {
    form:'/api/Forms/:id',
    seckill:'/api/Seckills/:id',
    vote:'/api/Votes/:id',
    luck:'/api/Lucks/:id'
  };
  var Edit = $resource(editProperty[$routeParams.type]);
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
        'type': $scope.forms[i].type,
        'label': $scope.forms[i].label,
        'content': $scope.forms[i].content
      };
      formQuestions.push(formQuestion);
    };
    Edit.save({data:{
        "title": 'not title',
        "startTime": '2015-02-07T15:31:19.591Z',
        "stopTime": '2015-03-07T15:31:19.591Z',
        "adPicture": '',
        "adUrl": '',
        "verifyRule": '',
        "updatedAt": '',
        "organizationUid": $window.localStorage.getItem('userId'),
        "formQuestions": formQuestions
      }
    });
  }
}

function ResultCtrl ($scope,$routeParams,$resource) {
  console.log($routeParams);
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
