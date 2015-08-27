function OrganizationCtrl($scope, $resource, $location, $sce) {
  $scope.tableCollapsed1 = true;
  $scope.tableCollapsed2 = true;
  $scope.tableCollapsed3 = true;
  $scope.tableCollapsed4 = true;
  var nowTime = new Date().getTime();
  var organizationUrlSearchObj = $location.search();
  $scope.title = '组织';
  var OrganizationUsers = $resource("/api/OrganizationUsers/detail/:id");
  var activities = $resource("/api/OrganizationUsers/:id/getactivities");
  var forms = $resource("/api/OrganizationUsers/:id/getforms");
  var votes = $resource("/api/OrganizationUsers/:id/getvotes");
  var seckills = $resource("/api/OrganizationUsers/:id/getseckills");
  OrganizationUsers.get({
      "id": organizationUrlSearchObj.id
    },
    function (res) {
      var organizationInfo = JSON.parse(res.org);
      $scope.title = organizationInfo.name;
      $scope.name = organizationInfo.name;
      $scope.logoUrl = organizationInfo.logoUrl;
      $scope.description = organizationInfo.description;
      $scope.userDefineDesc = organizationInfo.userDefineDesc;
      $scope.organizationUserDepartments = organizationInfo.organizationUserDepartments;
    },
    function (res) {
    }
  );
  function getStatus(ActType, flag) {
    for (var i = 0; i < ActType.length; i++) {
      if (!new Date(ActType[i].startTime).getTime() && !flag) {
        if (ActType[i].startTime.indexOf('-'))
          ActType[i].startTime = ActType[i].startTime.replace(/-/g, "/");
        if (ActType[i].stopTime.indexOf('-'))
          ActType[i].stopTime = ActType[i].stopTime.replace(/-/g, "/");
      }
      if (new Date(ActType[i].startTime).getTime() > nowTime) {
        ActType[i].status = "即将开始";
        ActType[i].textColor = "warning";
      } else if (flag === 0) {
        if (new Date(ActType[i].stopTime).getTime() < nowTime) {
          ActType[i].status = "已经结束";
          ActType[i].textColor = "danger";
        } else {
          ActType[i].status = "正在进行";
          ActType[i].textColor = "success";
        }
      } else if (flag === 1) {
        getCount(ActType[i]);
      }
    }
  }
  function getCount (seckill) {
    var seckillResult = $resource('/api/Seckills/rest/:id');
    seckillResult.get({
      id: seckill.id
    },function (res){
      seckill.rest = res.count;
      if (res.count <= 0) {
        seckill.status = "已经结束";
        seckill.textColor = "danger";
      } else {
        seckill.status = "正在进行";
        seckill.textColor = "success";
      }
    });
  }
  activities.get({
    "id": organizationUrlSearchObj.id,
    filter:{ order: 'id desc'}
  }, function (res) {
    $scope.activities = res.list;
    getStatus($scope.activities, 0);
  });
  forms.get({
    "id": organizationUrlSearchObj.id,
    filter:{ order: 'id desc'}
  }, function (res) {
    $scope.forms = res.list;
    getStatus($scope.forms, 0);
  });
  votes.get({
    "id": organizationUrlSearchObj.id,
    filter:{ order: 'id desc'}
  }, function (res) {
    $scope.votes = res.list;
    getStatus($scope.votes, 0);
  });
  seckills.get({
    "id": organizationUrlSearchObj.id,
    filter:{ order: 'id desc'}
  }, function (res) {
    $scope.seckills = res.list;
    getStatus($scope.seckills, 1);
  });
}

function RewriteResourceActions($resourceProvider) {
  var commonHeaders = {
    //Authorization: JSON.parse(window.localStorage.getItem('d2VjaGF0')).accessToken
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
app.controller('OrganizationCtrl', ['$scope', '$resource', '$location', '$sce',OrganizationCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);
app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});