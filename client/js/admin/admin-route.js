function RouteConfigure ($routeProvider){
  $routeProvider
    .when('/home',{
      templateUrl:'/admin/partials/home.html',
      controller: ['$scope',HomeCtrl]
    })
    .when('/setting',{
      templateUrl:'/admin/partials/setting.html',
      controller: ['$scope','$resource','$window','etuanAdmin',SettingCtrl]
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
      controller: ['$window','$scope','$routeParams','$resource','etuanAdmin',ListCtrl]
    })
    .when('/:type*/edit/:id*',{
      templateUrl:'/admin/partials/edit.html',
      controller: ['$scope','$routeParams','$resource','$window','$modal','etuanAdmin',EditCtrl]
    })
    .when('/:type*/result/:id*',{
      templateUrl:'/admin/partials/result.html',
      controller: ['$scope','$routeParams','$resource','$window','etuanAdmin',ResultCtrl]
    })
    .otherwise({redirectTo: '/home'});
}
