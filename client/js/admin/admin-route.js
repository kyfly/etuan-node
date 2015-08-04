function RouteConfigure($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/admin/partials/home.html',
      controller: ['$scope', '$resource', HomeCtrl]
    })
    .when('/setting', {
      templateUrl: '/admin/partials/setting.html',
      controller: ['$scope', '$resource', 'etuanAdmin', '$http', '$window', SettingCtrl]
    })
    .when('/help', {
      templateUrl: '/admin/partials/help.html',
      controller: HelpCtrl
    })
    .when('/:type*/list', {
      templateUrl: '/admin/partials/list.html',
      controller: ['$scope', '$routeParams', '$resource', '$window', 'etuanAdmin', ListCtrl]
    })
    .when('/:type*/edit/:id*', {
      templateUrl: '/admin/partials/edit.html',
      controller: ['$scope', '$routeParams', '$resource', '$window', 'etuanAdmin', EditCtrl]
    })
    .when('/:type*/result/:id*', {
      templateUrl: '/admin/partials/result.html',
      controller: ['$scope', '$routeParams', '$resource', '$window', 'etuanAdmin', ResultCtrl]
    })
    .otherwise({redirectTo: '/home'});
}
