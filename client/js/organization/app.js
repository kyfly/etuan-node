function OrganizationCtrl($scope, $resource, $location) {
  var organizationUrlSearchObj = $location.search();
  var OrganizationUsers = $resource("/api/OrganizationUsers/detail/%22:id%22?access_token=" + JSON.parse(window.localStorage.getItem('d2VjaGF0')).accessToken);
  OrganizationUsers.get({
      "id": organizationUrlSearchObj.id
    },
    function (res) {
      var organizationInfo = JSON.parse(res.org);
      $scope.title = organizationInfo.name;
      $scope.name = organizationInfo.name;
      $scope.logoUrl = organizationInfo.logoUrl;
      $scope.description = organizationInfo.description;
    },
    function (res) {
    }
  );
}

function RewriteResourceActions($resourceProvider) {
  var commonHeaders = {
    Authorization: JSON.parse(window.localStorage.getItem('d2VjaGF0')).accessToken
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
var app = angular.module('app', ['ngResource', 'ui.bootstrap']);
app.controller('OrganizationCtrl', ['$scope', '$resource', '$location', OrganizationCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);
app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});