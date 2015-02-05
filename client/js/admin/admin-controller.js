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
  var ListProperty = {
    form:'/api/Forms/:id',
    seckill:'/api/Seckills/:id',
    vote:'/api/Votes/:id',
    luck:'/api/Lucks/:id'
  }
  var List = $resource(ListProperty[$routeParams.type]);
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
  ];//List.query();

  $scope.edit = function (id) {
    $window.location.href = '#/'+$routeParams.type+'/edit/'+id;
  };
  $scope.result = function (id) {
    $window.location.href = '#/'+$routeParams.type+'/result/'+id;
  };
  $scope.delete = function (index,id) {
    $scope.listItems.splice(index,1);
    List.delete({'id':id});
  }
}

function EditCtrl ($scope,$routeParams,$resource) {
  console.log($routeParams);

  $scope.format = 'yyyy-MM-dd';
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.clear = function () {
    $scope.dt = null;
  };
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

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
    },
  }
  $scope.showType = ['','选择题','简答题','陈述题','判断题'];
  $scope.showContent = ['',true,false,false,false]
  $scope.removeForm = function (index) {
    $scope.forms.splice(index,1);
  }
}

function ResultCtrl ($scope,$routeParams,$resource) {
  console.log($routeParams);
  var ResultProperty = {
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
