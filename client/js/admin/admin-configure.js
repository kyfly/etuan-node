function RewriteResourceActions($resourceProvider) {
  var commonHeaders = {
    Authorization: JSON.parse(window.localStorage.getItem('b3JnYW5p')).accessToken
  };
  $resourceProvider.defaults.actions = {
    'get': {
      method: 'GET',
      headers: commonHeaders
    },
    'query': {
      method: 'GET',
      isArray: true,
      headers: commonHeaders
    },
    'save': {
      method: 'POST',
      headers: commonHeaders
    },
    'update': {
      method: 'PUT',
      headers: commonHeaders
    },
    'check': {
      method: 'HEAD',
      headers: commonHeaders
    },
    'delete': {
      method: 'DELETE',
      headers: commonHeaders
    }
  };
}

var app = angular.module('app', ['ngResource', 'ngAnimate', 'ngRoute', 'ui.bootstrap', 'ng.ueditor']);
app.config(['$resourceProvider', RewriteResourceActions]);
app.config(['$routeProvider', RouteConfigure]);
app.controller('SidebarCtrl', ['$scope', '$window', SidebarCtrl]);
app.controller('NavbarCtrl', ['$scope', '$window', '$resource', 'etuanAdmin', NavbarCtrl]);
app.controller('AdminCtrl', ['$scope', '$timeout', AdminCtrl]);
