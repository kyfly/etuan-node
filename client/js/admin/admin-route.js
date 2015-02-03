function RouteConfigure ($routeProvider){
  $routeProvider
    .when('/home',{
      templateUrl:'/admin/partials/sim-test/f1.html',
      controller: HomeCtrl
    })
    .when('/setting',{
      templateUrl:'/admin/partials/sim-test/f1.html',
      controller: SettingCtrl
    })
    .when('/help',{
      templateUrl:'/admin/partials/sim-test/f1.html',
      controller: HelpCtrl
    })
    .when('/wechat',{
      templateUrl:'/admin/partials/sim-test/f1.html',
      controller: WechatCtrl
    })
    .when('/:type*/list',{
      templateUrl:'/admin/partials/sim-test/f1.html',
      controller: ListCtrl
    })
    .when('/:type*/edit/:id*',{
      templateUrl:'/admin/partials/sim-test/f1.html',
      controller: EditCtrl
    })
    .when('/:type*/result/:id*',{
      templateUrl:'/admin/partials/sim-test/f1.html',
      controller: ResultCtrl
    })
    .otherwise({redirectTo: '/home'});
}
