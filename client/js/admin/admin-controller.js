function AdminCtrl ($scope,$timeout) {
  //768像素为界限决定侧边栏的显示与否
  $scope.sidebarShow = (document.body.clientWidth >= 768);
  $scope.sidebarToggle = function () {
    $scope.sidebarShow = !$scope.sidebarShow;
  };
  //监听ngView完成事件，延迟200ms用于页面渲染
  $scope.$on('$viewContentLoaded',function(){
    if (document.body.clientWidth >= 768) {
      $timeout(function(){
        document.getElementById('sidebar').style.height = document.getElementById('main').offsetHeight +'px';
      },200);
    }
  });
}

function NavbarCtrl ($scope,$window,$resource,etuanAdmin) {
  //团团一家LOGO
  $scope.etuanLogo = "/img/full-logo.png";
  //获取社团基本信息的接口，可以用于显示右上角信息
  var Organization = $resource(
    '/api/OrganizationUsers/:userId',{
      userId:etuanAdmin.cache.userId
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
  };
  //退出动作，包括清楚存储信息，返回至登录页面
  $scope.logOut = function () {
    $window.localStorage.removeItem('b3JnYW5p');
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
    }
    $scope.sidebars[index].active = true;
    $window.location.hash = $scope.sidebars[index].url;
  };
}

function ListCtrl ($scope,$routeParams,$resource,$window,etuanAdmin) {
  //项目的具体接口（resource格式），如需添加新的项目，请修改admin-service文件中的item.infoProperty属性
  var List = $resource(
    etuanAdmin.item.infoProperty[$routeParams.type],{
      userId:etuanAdmin.cache.userId
    }
  );
  $scope.contentShow = etuanAdmin.item.isBasicContent[$routeParams.type];
  //日期显示格式，标准Angular Date Filter格式,从service-etuanAdmin中去取得
  $scope.unFormat = etuanAdmin.datetime.unFormat;
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

function EditCtrl ($scope,$routeParams,$resource,$window,etuanAdmin) {
  /* 接口资源区
   * Edit为一个资源对象，实现所有的CRUD的基础
   * 项目的具体接口（resource格式），如需添加新的项目，请修改admin-service文件中的item.infoProperty属性
   */
  var Edit = $resource(
    etuanAdmin.item.infoProperty[$routeParams.type],{
      userId:etuanAdmin.cache.userId
    }
  );
  /* 初始化区
   * initEdit()为新建页面时初始化通用部分的函数
   * loadEdit()为编辑页面时对于已有信息的加载
   * 在函数中其中分成两部分，顺序结构部分用于初始化通用部分，switch结构用于初始化功能特定的部分
   * intial()决定将edit页面初始化为“新建”还是编辑“编辑”，以及实现对初始化函数的调用
   */
  $scope.contentShow = etuanAdmin.item.isBasicContent[$routeParams.type];
  var initEdit = function () {
    if ($scope.contentShow[2]) {
      $scope.startTime = new Date();
    }
    if ($scope.contentShow[3]) {
      $scope.stopTime = new Date();
    }
  };
  var loadEdit = function () {
    Edit.get({fk:$routeParams.id},
      function(res){
        if ($scope.contentShow[0]) {
          $scope.title = res.title;
        }
        if ($scope.contentShow[1]) {
          $scope.description = res.description;
        }
        if ($scope.contentShow[2]) {
          $scope.startTime = new Date(res.startTime);
          $scope.startDate = new Date(res.startTime);
          $scope.startDate.toString = function () {
            return this.getFullYear() + '年' + (this.getMonth() + 1) + '月' + this.getDate() + '日';
          };
        }
        if ($scope.contentShow[3]) {
          $scope.stopTime = new Date(res.stopTime);
          $scope.stopDate = new Date(res.stopTime);
          $scope.stopDate.toString = function () {
            return this.getFullYear() + '年' + (this.getMonth() + 1) + '月' + this.getDate() + '日';
          };
        }
        if ($scope.contentShow[4]) {
          $scope.verifyRule = res.verifyRule;
        }
        switch ($routeParams.type){
          case 'form':
            $scope.forms = res.formQuestions;
            break;
          //由于疯抢中每一个子活动都有开始时间和结束时间所以每一个时间都要进行单独
          case 'seckill':
            for (var i = 0; i < res.seckillArrangements.length; i++) {
              var seckillArrangementsTmp = {};
              seckillArrangementsTmp.total = res.seckillArrangements[i].total;
              seckillArrangementsTmp.startTime = new Date(res.seckillArrangements[i].startTime);
              seckillArrangementsTmp.startDate = new Date(res.seckillArrangements[i].startTime);
              seckillArrangementsTmp.startDate.toString = function(){
                return this.getFullYear()+'年'+(this.getMonth()+1)+'月'+this.getDate()+'日';
              };
              seckillArrangementsTmp.seckillStartDateOpen = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                this.seckillStartOpened = true;
              },
              $scope.seckills.push(seckillArrangementsTmp);
            }
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
  $scope.cnDateFormat = etuanAdmin.datetime.cnDateFormat;
  $scope.unDateFormat = etuanAdmin.datetime.unDateFormat;
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
  $scope.activityConfig = etuanAdmin.editor.config;
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
        content:etuanAdmin.org.schools
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
    }
  };
  $scope.moveDownForm = function (index) {
    if (index < $scope.forms.length) {
      $scope.forms.splice(index+1,0,$scope.forms.splice(index,1)[0]);
    }
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
      startDate: '',
      total:0,
      seckillStartDateOpen: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.seckillStartOpened = true;
      },
      startTime: new Date()
    });
  };
  $scope.removeSeckill = function (index) {
    $scope.seckills.splice(index,1);
  };

  /* 投票特定功能区
   * 实现了表单项目的CRUD
   */
  $scope.votes = [];
  $scope.addVote = function () {
    $scope.votes.push({
      'name':'这是一个投票项',
      'detailUrl':''
    });
  };
  $scope.removeVote = function (index) {
    $scope.votes.splice(index,1);
  };
  $scope.moveUpVote = function (index) {
    if (index > 0) {
      $scope.votes.splice(index-1,0,$scope.votes.splice(index,1)[0]);
    }
  };
  $scope.moveDownVote = function (index) {
    if (index < $scope.votes.length) {
      $scope.votes.splice(index+1,0,$scope.votes.splice(index,1)[0]);
    }
  };
  /* 提交区
   * 用于提交数据，uploadParameter中首先加入通用部分的参数，然后根据switch结构向其中分别添加特定部分的参数
   * 在完成提交后，将转跳至列表页面list.html
   */
  $scope.submit = function () {
    //上传图片至OSS服务
    var logoFd = new FormData();
    var logoFile = document.getElementById($scope.cnType+'logo').files[0];
    var logoXhr = new XMLHttpRequest();
    var fileExt =/\.[^\.]+/.exec(document.getElementById($scope.cnType + 'logo').value.toLowerCase());
    if(!((fileExt[0] === '.png')||(fileExt[0] === '.jpg')||(fileExt[0] === '.jpeg')||(fileExt[0] === '.gif'))){
      alert('请确认您上传的logo文件格式是jpg、png、gif或jpeg');
      return false;
    }
    var logoReadyHandle = function () {
      if (logoXhr.readyState === 4) {
        if (logoXhr.status === 200) {
          $scope.logoUrl = JSON.parse(logoXhr.responseText).url;
          Edit.update({logoUrl:$scope.logoUrl});
        }
      }
    };
    logoFd.append('logo',logoFile);
    logoXhr.onreadystatechange = logoReadyHandle;
    logoXhr.open('POST','/ue/uploads?action=uploadimage&dir=logo&access_token='+JSON.parse(window.localStorage.getItem('b3JnYW5p')).accessToken,true);
    logoXhr.send(logoFd);

    var uploadParameters = {};
    uploadParameters.updatedAt = new Date();
    if ($scope.contentShow[0]) {
      uploadParameters.title = $scope.title;
    }
    if ($scope.contentShow[1]) {
      uploadParameters.description = $scope.description;
    }
    if ($scope.contentShow[2]) {
      uploadParameters.startTime = new Date($scope.startDate.getFullYear(),$scope.startDate.getMonth(),$scope.startDate.getDate(),$scope.startTime.getHours(),$scope.startTime.getMinutes()).toISOString();
    }
    if ($scope.contentShow[3]) {
      uploadParameters.stopTime = new Date($scope.stopDate.getFullYear(),$scope.stopDate.getMonth(),$scope.stopDate.getDate(),$scope.stopTime.getHours(),$scope.stopTime.getMinutes()).toISOString();
    }
    if ($scope.contentShow[4]) {
      uploadParameters.verifyRule = $scope.verifyRule;
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
        if ($scope.seckills.length === 0) {
          alert('请至少添加一轮抢票');
          return;
        }
        for (var i = 0; i < $scope.seckills.length; i++) {
          var seckillStartTmp = new Date($scope.seckills[i].startDate.getFullYear(),$scope.seckills[i].startDate.getMonth(),$scope.seckills[i].startDate.getDate(),$scope.seckills[i].startTime.getHours(),$scope.seckills[i].startTime.getMinutes());
          var seckillArrangement = {
            'id':i,
            'startTime':seckillStartTmp.toISOString(),
            'total':$scope.seckills[i].total
          };
          seckillArrangementsTmp.push(seckillArrangement);
          if (i !== 0 && seckillStartTmp <= new Date(seckillArrangementsTmp[i - 1].startTime) ) {
            alert('请按时间先后顺序设置各轮开始时间');
            return;
          }
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
    window.history.back();
  };

  $scope.preview = function(){
  };
}

function ResultCtrl ($scope,$routeParams,$resource,$window,etuanAdmin) {
  /* 结果页面配置区
   * 用于设置结果页面的各项显示上的差异化配置。
   */
  var resultConfig = etuanAdmin.item.resultDownloadType;
  /* 接口区
   * 结果页面上的各项接口。项目的具体接口（resource格式），如需添加新的项目，请修改admin-service文件中的item.infoProperty属性
   */
  var Result = $resource(
    etuanAdmin.item.resultProperty[$routeParams.type],{
      id:$routeParams.id
    }
  );
  var Info = $resource(
    etuanAdmin.item.infoProperty[$routeParams.type],{
      userId:etuanAdmin.cache.userId,
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
  $scope.cnFormat = etuanAdmin.datetime.cnFormat;
  /* 结果处理区
   * 将各种不同的结果显示到同一张表格中，处理收到的各类不同的json。
   */
  var resultsProcess = function (res) {
    switch ($routeParams.type) {
      case 'activity':
        break;
      case 'form':
        for (var i = 0; i < res.length; i++) {
          var formResultTmp = [];
          var answersTmp = res[i].formResultAnswers;
          for (var j = 0; j < answersTmp.length; j++) {
            formResultTmp.push(answersTmp[j].content);
          }
          $scope.results.push(formResultTmp);
        }
        break;
      case 'seckill':
        break;
      case 'vote':
        for (var i = 0; i < res.length; i++) {
          var voteResultTmp = [];
          voteResultTmp.push(res[i].name);
          voteResultTmp.push(res[i].count);
          $scope.results.push(voteResultTmp);
        }
        break;
    }
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
        }
        break;
      case 'seckill':
        $scope.title = res.title;
        $scope.startTime = res.seckillArrangements[0].startTime;
        $scope.stopTime = res.seckillArrangements[res.seckillArrangements.length - 1].startTime;
        break;
      case 'vote':
        $scope.title = res.title;
        $scope.startTime = res.startTime;
        $scope.stopTime = res.stopTime;
        $scope.resultHeaders.push('名称');
        $scope.resultHeaders.push('数量');
        break;
    }
  };
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
  /* 结果下载页面的获取区
   * 在这个区域中包括了pdf下载和excel下载。
   */
  $scope.pdfDownload = function () {
    window.open('/api/Forms/pdf/'+$routeParams.id,'_blank');
  };
  $scope.excelDownload = function () {
    window.open('/api/Forms/excel/'+$routeParams.id,'_blank');
  };
}

function HomeCtrl ($scope,$resource) {
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
  //获得接口并进行显示
  $resource('/api/OrganizationUsers/actCount').get({},function(res){console.log(res);$scope.actCount=res.actCount.actCount;},function(){});
  $resource('/api/OrganizationUsers/viewCount').get({},function(res){console.log(res);$scope.viewCount=res.viewCount.viewCount;},function(){});
  $resource('/api/OrganizationUsers/parCount').get({},function(res){console.log(res);$scope.parCount=res.parCount.parCount;},function(){});
}

function SettingCtrl ($scope,$resource,etuanAdmin) {
  var Setting = $resource(
    '/api/OrganizationUsers/:userId',{
      userId:etuanAdmin.cache.userId
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
      $scope.organizationUserDepartments = res.organizationUserDepartments;
    },
    function () {}
  );
  $scope.types = etuanAdmin.org.types;
  //下面的这个写法是根据社团属性来动态实现下面学院选择的变化，三元表达式的写法是对if/else模形的简写方式
  $scope.schools = ($scope.type==='校级社团'||$scope.type==='校级组织')?['全校']:etuanAdmin.org.schools;
  $scope.typeChange = function () {
    $scope.schools = ($scope.type==='校级社团'||$scope.type==='校级组织')?['全校']:etuanAdmin.org.schools;
  };
  //上传图片至OSS服务
  $scope.logoUpload = function () {
    var logoFd = new FormData();
    var logoFile = document.getElementById('logo').files[0];
    var logoXhr = new XMLHttpRequest();
    var fileExt =/\.[^\.]+/.exec(document.getElementById('logo').value.toLowerCase());
    if(!((fileExt == '.png')||(fileExt == '.jpg')||(fileExt == '.jpeg')||(fileExt == '.gif'))){
      alert('请确认您上传的logo文件格式是jpg、png、gif或jpeg');
      return false;
    }
    var logoReadyHandle = function () {
      if (logoXhr.readyState === 4) {
        if (logoXhr.status === 200) {
          $scope.logoUrl = JSON.parse(logoXhr.responseText).url;
          Setting.update({logoUrl:$scope.logoUrl});
        }
      }
    };
    logoFd.append('logo',logoFile);
    logoXhr.onreadystatechange = logoReadyHandle;
    logoXhr.open('POST','/ue/uploads?action=uploadimage&dir=logo&access_token='+JSON.parse(window.localStorage.getItem('b3JnYW5p')).accessToken,true);
    logoXhr.send(logoFd);
  };
  //基本信息提交按钮
  $scope.basicSubmit = function () {
    Setting.update({
        name:$scope.name,
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
  $scope.addDepartment = function () {
    $scope.organizationUserDepartments.push({
      name:'部门',
      description:'部门介绍'
    });
  };
  $scope.moveUpDepartment = function (index) {
    if (index > 0) {
      $scope.organizationUserDepartments.splice(index-1,0,$scope.organizationUserDepartments.splice(index,1)[0]);
    }
  };
  $scope.moveDownDepartment = function (index) {
    if (index < $scope.organizationUserDepartments.length) {
      $scope.organizationUserDepartments.splice(index+1,0,$scope.organizationUserDepartments.splice(index,1)[0]);
    }
  };
  $scope.removeDepartment = function (index) {
    $scope.organizationUserDepartments.splice(index,1);
  };
  //部门信息提交按钮
  $scope.departmentSubmit = function () {
    var dsTmp = [];
    for (var i = 0; i < $scope.organizationUserDepartments.length; i++) {
      dsTmp.push($scope.organizationUserDepartments[i]);
      dsTmp[i].id = i;
    }
    Setting.update({
      organizationUserDepartments:dsTmp});
  };
}

function HelpCtrl () {}
