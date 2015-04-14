function AdminCtrl ($scope,$window,$timeout) {
  //768像素为界限决定侧边栏的显示与否
  $scope.sidebarShow = (document.body.clientWidth >= 768);
  $scope.sidebarToggle = function () {
    $scope.sidebarShow = !$scope.sidebarShow;
  };
  //监听ngView完成事件，延迟100ms用于页面渲染
  $scope.$on('$viewContentLoaded',function(){
    if (document.body.clientWidth >= 768) {
      $timeout(function(){
        document.getElementById('sidebar').style.height = document.getElementById('main').offsetHeight +'px';
      },100);
    }
  });
}

function NavbarCtrl ($scope,$window,$resource) {
  //团团一家LOGO
  $scope.etuanLogo = "/img/full-logo.png";
  //获取社团基本信息的接口，可以用于显示右上角信息
  var Organization = $resource(
    '/api/OrganizationUsers/:userId',{
      userId:$window.localStorage.getItem('userId')
    }
  );
  Organization.get({},
    function (res) {
      $scope.organizationName = res.name;
      $scope.organizationLogo = res.logoUrl;
    },
    function () {}
  );
  //主页跳转动作（点击团团一家LOGO）
  $scope.redirectToHomapage = function () {
    $window.location = '/index.html';
  };
  //设置跳转动作（点击右上角信息）
  $scope.redirectToSetting = function () {
    $window.location.hash = '#/setting'
  }
  //退出动作，包括清楚存储信息，返回至登录页面
  $scope.logOut = function () {
    $window.localStorage.removeItem('accessToken');
    $window.localStorage.removeItem('userId');
    $window.localStorage.removeItem('loginTime');
    $window.location = '/login/';
  };
}

function SidebarCtrl ($scope,$window) {
  //检测函数，利用路由判断，辅助检测左边的按钮何时应该高亮
  var sidebarItemChosen = function (type) {
    var rx = new RegExp('#\/'+type);
    return rx.test($window.location.hash);
  };
  //侧边栏显示内容
  $scope.sidebars = [
    {
      'id':'sidebarHome',
      'display_name':'首页',
      'url':'#/home',
      'active':sidebarItemChosen('home')
    },
    {
      'id':'sidebarForm',
      'display_name':'活动',
      'url':'#/activity/list',
      'active':sidebarItemChosen('activity')
    },
    {
      'id':'sidebarForm',
      'display_name':'表单',
      'url':'#/form/list',
      'active':sidebarItemChosen('form')
    },
    {
      'id':'sidebarSeckill',
      'display_name':'疯抢',
      'url':'#/seckill/list',
      'active':sidebarItemChosen('seckill')
    },
    {
      'id':'sidebarVote',
      'display_name':'投票',
      'url':'#/vote/list',
      'active':sidebarItemChosen('vote')
    },
    {
      'id':'sidebarWechat',
      'display_name':'微信',
      'url':'#/wechat',
      'active':sidebarItemChosen('wechat')
    },
    {
      'id':'sidebarSetting',
      'display_name':'设置',
      'url':'#/setting',
      'active':sidebarItemChosen('setting')
    },
    {
      'id':'sidebarHelp',
      'display_name':'帮助',
      'url':'#/help',
      'active':sidebarItemChosen('help')
    }
  ];
  //跳转函数，包括操作侧边栏按钮和跳转至相应页面
  $scope.redirect = function(index) {
    for (var i = 0; i < $scope.sidebars.length; i++) {
      $scope.sidebars[i].active = false;
    };
    $scope.sidebars[index].active = true;
    $window.location.hash = $scope.sidebars[index].url;
  };
}

function ListCtrl ($window,$scope,$routeParams,$resource,etuanAdmin) {
  //项目的具体接口（resource格式），如需添加新的项目，请修改admin-service文件中的itemProperty属性
  var List = $resource(
    etuanAdmin.itemProperty[$routeParams.type],{
      userId:$window.localStorage.getItem('userId')
    }
  );
  //日期显示格式，标准Angular Date Filter格式,从service-etuanAdmin中去取得
  $scope.unFormat = etuanAdmin.unFormat;
  //请求获取信息
  $scope.listItems = List.query();
  //编辑按钮操作函数
  $scope.edit = function (id) {
    $window.location.hash = '#/'+$routeParams.type+'/edit/'+id;
  };
  //结果按钮操作函数
  $scope.result = function (id) {
    $window.location.hash = '#/'+$routeParams.type+'/result/'+id;
  };
  //删除按钮操作函数
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

function EditCtrl ($scope,$routeParams,$resource,$window,$modal,etuanAdmin) {
  /* 接口资源区
   * Edit为一个资源对象，实现所有的CRUD的基础
   * 项目的具体接口（resource格式），如需添加新的项目，请修改admin-service文件中的itemProperty属性
   */
  var Edit = $resource(
    etuanAdmin.itemProperty[$routeParams.type],{
      userId:$window.localStorage.getItem('userId')
    }
  );
  /* 初始化区
   * initEdit()为新建页面时初始化通用部分的函数
   * loadEdit()为编辑页面时对于已有信息的加载
   * 在函数中其中分成两部分，顺序结构部分用于初始化通用部分，switch结构用于初始化功能特定的部分
   * intial()决定将edit页面初始化为“新建”还是编辑“编辑”，以及实现对初始化函数的调用
   */
  var initEdit = function () {
    $scope.startTime = new Date();
    $scope.stopTime = new Date();
  }; 
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
          //由于疯抢中每一个子活动都有开始时间和结束时间所以每一个时间都要进行单独
          case 'seckill':
            for (var i = 0; i < res.seckillArrangements.length; i++) {
              var seckillArrangementsTmp = {};
              seckillArrangementsTmp.title = res.seckillArrangements[i].title;
              seckillArrangementsTmp.total = res.seckillArrangements[i].total;
              seckillArrangementsTmp.startTime = new Date(res.seckillArrangements[i].startTime);
              seckillArrangementsTmp.startDate = new Date(res.seckillArrangements[i].startTime);
              seckillArrangementsTmp.startDate.toString = function(){
                return this.getFullYear()+'年'+(this.getMonth()+1)+'月'+this.getDate()+'日 ';
              };
              seckillArrangementsTmp.stopTime = new Date(res.seckillArrangements[i].stopTime);
              seckillArrangementsTmp.stopDate = new Date(res.seckillArrangements[i].stopTime);
              seckillArrangementsTmp.stopDate.toString = function(){
                return this.getFullYear()+'年'+(this.getMonth()+1)+'月'+this.getDate()+'日 ';
              };    
              $scope.seckills.push(seckillArrangementsTmp);
            };
            break;
          case 'vote':
            $scope.votes = res.voteSubitems;
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
    $scope.cnType = etuanAdmin.dict[$routeParams.type];
    $scope.mode = $routeParams.id === 'create'?('新建'+$scope.cnType+' '):('编辑'+$scope.cnType+' ');
    $scope.submitButtonName = $routeParams.id === 'create'?'创建':'更新';
  };
  initial();
  /* 日期选择器配置
   * DATEPICKER组件调用参数
   */
  $scope.cnDateFormat = etuanAdmin.cnDateFormat;
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
  $scope.isActivity = function () {
    return 'activity' === $routeParams.type;
  };
  $scope.isForm = function () {
    return 'form' === $routeParams.type;
  };
  $scope.isSeckill = function () {
    return 'seckill' === $routeParams.type;
  };
  $scope.isVote = function () {
    return 'vote' === $routeParams.type;
  };
  /* 活动特定功能区
   * 获得编辑器得到的contentUrl
   */
  $scope.openActivity = function () {
    var modalInstance = $modal.open({
      templateUrl:'/editor/index.html',
      controller:EditorCtrl,
      size:'lg'
    });
  };
  $scope.activityContentUrl = 'http://www.baidu.com';
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
    },
    name:function () {
      $scope.forms.push({
        type:2,
        label:'姓名',
        content:[]
      });
    },
    sex:function () {
      $scope.forms.push({
        type:1,
        label:'性别',
        content:['男','女']
      });
    },
    personalID:function () {
      $scope.forms.push({
        type:2,
        label:'身份证号',
        content:[]
      });
    },
    hometown:function () {
      $scope.forms.push({
        type:2,
        label:'籍贯',
        content:[]
      });
    },
    studentID:function () {
      $scope.forms.push({
        type:2,
        label:'学号',
        content:[]
      });
    },
    school:function () {
      $scope.forms.push({
        type:1,
        label:'学院',
        content:['机械工程学院','电子信息学院','通信工程学院','自动化学院','计算机学院','生命信息与仪器工程学院','材料与环境工程学院','软件工程学院','理学院','经济学院','管理学院','会计学院','外国语学院','数字媒体与艺术设计学院','人文与法学院','马克思主义学院','卓越学院','信息工程学院','国际教育学院','继续教育学院']
      });
    },
    major:function () {
      $scope.forms.push({
        type:2,
        label:'专业',
        content:[]
      });
    },
    email:function () {
      $scope.forms.push({
        type:2,
        label:'电子邮箱',
        content:[]
      });
    },
    qqNumber:function () {
      $scope.forms.push({
        type:2,
        label:'QQ号',
        content:[]
      });
    },
    longCellphoneNumber:function () {
      $scope.forms.push({
        type:2,
        label:'手机长号',
        content:[]
      });
    },
    shortCellphoneNumber:function () {
      $scope.forms.push({
        type:2,
        label:'手机短号',
        content:[]
      });
    },
    introduction:function () {
      $scope.forms.push({
        type:3,
        label:'个人简介',
        content:[]
      });
    },
    specials:function () {
      $scope.forms.push({
        type:3,
        label:'特长',
        content:[]
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
  /* 疯抢特定功能区
   * 实现了疯抢项目的CRUD
   */
  $scope.seckills = [];
  $scope.addSeckill = function () {
    $scope.seckills.push({
      title:'这是一轮新的疯抢',
      startTime:'',
      stopTime:'',
      total:0,
      seckillStartDateOpen: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.seckillStartOpened = true;
      },
      seckillStopDateOpen: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.seckillStopOpened = true;
      },
      startTime: new Date(),
      stopTime: new Date()
    });
  };
  $scope.removeSeckill = function (index) {
    $scope.seckills.splice(index,1);
  };

  /* 投票特定功能区
   * 实现了表单项目的CRUD
   */
  $scope.votes = [];
  $scope.editVote = function () {
    var modalInstance = $modal.open({
      templateUrl:'/editor/index.html',
      controller:EditorCtrl,
      size:'lg'
    });
  }
  $scope.addVote = function () {
    $scope.votes.push({
      'name':'这是一个投票项',
      'detailUrl':''
    });
  }
  $scope.removeVote = function (index) {
    $scope.votes.splice(index,1);
  };
  $scope.moveUpVote = function (index) {
    if (index > 0) {
      $scope.votes.splice(index-1,0,$scope.votes.splice(index,1)[0]);
    };
  };
  $scope.moveDownVote = function (index) {
    if (index < $scope.votes.length) {
      $scope.votes.splice(index+1,0,$scope.votes.splice(index,1)[0]);
    };
  };
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
      'adPicture': '',
      'adUrl': '',
      'startTime': startTmp.toISOString(),
      'stopTime': stopTmp.toISOString(),
      'verifyRule': $scope.verifyRule,
      'updatedAt': nowTime.toISOString()
    }
    switch ($routeParams.type){
      case 'activity':
          uploadParameters.contentUrl = $scope.activityContentUrl;
        break;
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
        var seckillArrangementsTmp = [];
        for (var i = 0; i < $scope.seckills.length; i++) {
          var startTmp = new Date($scope.seckills[i].startDate.getFullYear(),$scope.seckills[i].startDate.getMonth(),$scope.seckills[i].startDate.getDate(),$scope.seckills[i].startTime.getHours(),$scope.seckills[i].startTime.getMinutes());
          var stopTmp = new Date($scope.seckills[i].stopDate.getFullYear(),$scope.seckills[i].stopDate.getMonth(),$scope.seckills[i].stopDate.getDate(),$scope.seckills[i].stopTime.getHours(),$scope.seckills[i].stopTime.getMinutes());
          var seckillArrangement = {
            'id':i,
            'title':$scope.seckills[i].title,
            'startTime':$scope.seckills[i].startTime.toISOString(),
            'stopTime':$scope.seckills[i].stopTime.toISOString(),
            'total':$scope.seckills[i].total
          }
          seckillArrangementsTmp.push(seckillArrangement);
        }
        uploadParameters.seckillArrangements = seckillArrangementsTmp;
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

function ResultCtrl ($scope,$routeParams,$resource,$window,etuanAdmin) {
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
    }
  };
  /* 接口区
   * 结果页面上的各项接口。项目的具体接口（resource格式），如需添加新的项目，请修改admin-service文件中的itemProperty属性
   */
  var Result = $resource(
    etuanAdmin.resultProperty[$routeParams.type],{
      id:$routeParams.id
    }
  );
  var Info = $resource(
    etuanAdmin.itemProperty[$routeParams.type],{
      userId:$window.localStorage.getItem('userId'),
      fk:$routeParams.id
    }
  );
  /* 页面ViewModel区
   * 用于直接和页面上绑定的各项变量
   */
  $scope.mode = etuanAdmin.dict[$routeParams.type]+'结果 ';
  $scope.title = '';
  $scope.currentResultConfig = resultConfig[$routeParams.type];
  $scope.results = [];
  $scope.resultHeaders = [];
  $scope.info = {};
  $scope.cnFormat = etuanAdmin.cnFormat;
  /* 结果处理区
   * 将各种不同的结果显示到同一张表格中，处理收到的各类不同的json。
   */
  var resultsProcess = function (res) {
    switch ($routeParams.type) {
      case 'activity':
        break;
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
      case 'seckill':
        break;
      case 'vote':
        for (var i = 0; i < res.length; i++) {
          var resultTmp = [];
          resultTmp.push(res[i].name);
          resultTmp.push(res[i].count);
          $scope.results.push(resultTmp);
        };
        break;
    };
  };
  var infoProcess = function (res) {
    switch ($routeParams.type) {
      case 'activity':
        $scope.title = res.title;
        $scope.startTime = res.startTime;
        $scope.stopTime = res.stopTime;
        break;
      case 'form':
        $scope.title = res.title;
        $scope.startTime = res.startTime;
        $scope.stopTime = res.stopTime;
        $scope.resultHeaders.push('序号');
        for (var i = 0; i < res.formQuestions.length; i++) {
          $scope.resultHeaders.push(res.formQuestions[i].label);
        };
        break;
      case 'seckill':
        $scope.title = res.title;
        $scope.startTime = res.startTime;
        $scope.stopTime = res.stopTime;
        break;
      case 'vote':
        $scope.title = res.title;
        $scope.startTime = res.startTime;
        $scope.stopTime = res.stopTime;
        $scope.resultHeaders.push('名称');
        $scope.resultHeaders.push('数量');
        break;
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
  //这里写着所有的通知通告，别忘了上面的三个数字的实现也要写在这一块地方
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
  ];
}

function SettingCtrl ($scope,$resource,$window,etuanAdmin) {
  var Setting = $resource(
    '/api/OrganizationUsers/:userId',{
      userId:$window.localStorage.getItem('userId')
    }
  );
  Setting.get({},
    function (res) {
      $scope.name = res.name;
      $scope.logoUrl = res.logoUrl;
      $scope.description = res.description;
      $scope.type = res.type || '院级社团';
      $scope.school = res.school || '计算机学院';
      $scope.weChat = res.weChat;
      $scope.phone = res.phone;
    },
    function () {}
  );
  $scope.types = ['校级社团','校级组织','院级社团','院级组织'];
  //下面的这个写法是根据社团属性来动态实现下面学院选择的变化，三元表达式的写法是对if/else模形的简写方式
  $scope.schools = ($scope.type==='校级社团'||$scope.type==='校级组织')?['全校']:['机械工程学院','电子信息学院','通信工程学院','自动化学院','计算机学院','生命信息与仪器工程学院','材料与环境工程学院','软件工程学院','理学院','经济学院','管理学院','会计学院','外国语学院','数字媒体与艺术设计学院','人文与法学院','马克思主义学院','卓越学院','信息工程学院','国际教育学院','继续教育学院'];
  $scope.typeChange = function () {
    $scope.schools = ($scope.type==='校级社团'||$scope.type==='校级组织')?['全校']:['机械工程学院','电子信息学院','通信工程学院','自动化学院','计算机学院','生命信息与仪器工程学院','材料与环境工程学院','软件工程学院','理学院','经济学院','管理学院','会计学院','外国语学院','数字媒体与艺术设计学院','人文与法学院','马克思主义学院','卓越学院','信息工程学院','国际教育学院','继续教育学院'];
  }
  //上传图片至OSS服务
  $scope.logoUpload = function () {
    var logoFd = new FormData();
    var logoFile = document.getElementById('logo').files[0];
    var logoXhr = new XMLHttpRequest();
    logoFd.append('logo',logoFile);
    console.log(logoFd);
    logoXhr.open('POST','/ue/uploads',true);
    logoXhr.send();
  };
  //提交设置按钮
  $scope.submit = function () {
    Setting.update({
        name:$scope.name,
        logoUrl:'/img/logo.jpg',//Temporary Logo File URL
        description:$scope.description,
        type:$scope.type,
        school:$scope.school,
        weChat:$scope.weChat,
        phone:$scope.phone
      },
      function () {},
      function () {}
    );
  };
}

function EditorCtrl () {}
function WechatCtrl () {}
function HelpCtrl () {}
