function RewriteResourceActions ($resourceProvider) {
  var commonHeaders = {
    Authorization:window.localStorage.getItem('accessToken')
  };
  $resourceProvider.defaults.actions = {
    'get':{
      method:'GET',
      headers:commonHeaders
    },
    'query':{
      method:'GET',
      isArray:true,
      headers:commonHeaders
    },
    'save':{
      method:'POST',
      headers:commonHeaders
    },
    'update':{
      method:'PUT',
      headers:commonHeaders
    },
    'check':{
      method:'HEAD',
      headers:commonHeaders
    },
    'delete':{
      method:'DELETE',
      headers:commonHeaders
    }
  };
}

var app = angular.module('app', ['ngResource','ngAnimate','ngRoute','ngTouch','ui.bootstrap']);
app.value('dict',{
  'activity':'活动',
  'form': '表单',
  'seckill': '疯抢',
  'vote': '投票'
});
app.config(['$resourceProvider',RewriteResourceActions]);
app.config(['$routeProvider',RouteConfigure]);
app.controller('SidebarCtrl',['$scope','$window',SidebarCtrl]);
app.controller('NavbarCtrl',['$scope','$window',NavbarCtrl]);
app.controller('AdminCtrl',['$scope','$window',AdminCtrl]);
