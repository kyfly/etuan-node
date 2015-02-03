function RouteConfigure ($routeProvider){
  $routeProvider
    .when('/home',{
      templateUrl:'/admin/partials/home.html',
      controller: HomeCtrl
    })
    .when('/setting',{
      templateUrl:'/admin/partials/setting.html',
      controller: SettingCtrl
    })
    .when('/help',{
      templateUrl:'/admin/partials/help.html',
      controller: HelpCtrl
    })
    .when('/wechat',{
      templateUrl:'/admin/partials/wechat.html',
      controller: WechatCtrl
    })
    .when('/:type*/list',{
      templateUrl:'/admin/partials/list.html',
      controller: ListCtrl
    })
    .when('/:type*/edit/:id*',{
      templateUrl:'/admin/partials/edit.html',
      controller: EditCtrl
    })
    .when('/:type*/result/:id*',{
      templateUrl:'/admin/partials/result.html',
      controller: ResultCtrl
    })
    .otherwise({redirectTo: '/home'});
}
