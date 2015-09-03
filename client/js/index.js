var app = angular.module('app', ['ui.bootstrap']);
var nowTime = new Date().getTime();

app.controller('headCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.isCollapsed = true;
  $http.get('api/Universities?filter=%7B%22fields%22%3A%7B%22name%22%3Atrue%7D%7D').success(function (res) {
    $scope.university = res;
  });
  $scope.schoolSelect = '杭州电子科技大学';
  $scope.changeSchool = function () {
    Activity($http, $scope.$$nextSibling, this.u.name);
    this.$parent.schoolSelect = this.u.name;
    window.localStorage.setItem('pc', this.u.name);
  }
}]);


function StatusFun(ActType, flag) {
  for (var i = 0; i < ActType.length; i++) {
    if (!new Date(ActType[i].startTime).getTime() && !flag) {
      if (ActType[i].startTime.indexOf('-'))
        ActType[i].startTime = ActType[i].startTime.replace(/-/g, "/");
      if (ActType[i].stopTime.indexOf('-'))
        ActType[i].stopTime = ActType[i].stopTime.replace(/-/g, "/");
    }
    if (new Date(ActType[i].startTime).getTime() > nowTime) {
      ActType[i].activityStatus = "即将开始";
      ActType[i].textColor = "warning";
    } else if (flag === 0) {
      if (new Date(ActType[i].stopTime).getTime() < nowTime) {
        ActType[i].activityStatus = "已经结束";
        ActType[i].textColor = "danger";
      } else {
        ActType[i].activityStatus = "正在进行";
        ActType[i].textColor = "success";
      }
    } else if (flag === 1) {
      if ((new Date(ActType[i].seckillArrangements[ActType[i].seckillArrangements.length - 1].startTime).getTime() + 86400000 * 2) < nowTime) {
        ActType[i].activityStatus = "已经结束";
        ActType[i].textColor = "danger";
      } else {
        ActType[i].activityStatus = "正在进行";
        ActType[i].textColor = "success";
      }
    }
  }
}
function getActivityData ($http, scope, types, result, limit, school) {
    $http.get('/api/'+ types,
    {
      params:{
        filter:{
          order: 'id desc',
          where: {"university": school},
          limit: limit
        }
      }
    })
    .success(function (res) {
      if (result === 'olts') {
        scope[result] = JSON.parse(res.orgs);
      } else if (result === 'skls') {
        scope[result] = res;
        StatusFun (scope[result],1);
      } else {
        scope[result] = res;
        StatusFun (scope[result],0);
      }
    });
}
function Activity ($http, $scope, school) {
  var Apis = ['Activities', 'Forms', 'Votes', 'Seckills','OrganizationUsers/list'];
  var result = ['alts','flts','vlts','skls','olts'];
  var types = ['activity', 'form', 'vote', 'seckill','organization'];
  if (/\/(.+)List\.html/.exec(location.pathname)){
    var accessPage = /\/(.+)List\.html/.exec(location.pathname)[1];
    var typeIndex = types.indexOf(accessPage);
    var limit = undefined;
  }
  else{
    var accessPage = 'all';
    var limit = 4;
  }
  if (accessPage === 'all') {
    for (var i = 0; i < Apis.length-1; i++) {
      getActivityData ($http, $scope, Apis[i], result[i], limit, undefined);
    }
  }
  else
    getActivityData ($http, $scope, Apis[typeIndex], result[typeIndex], limit, school);
}
app.controller('contentCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  var d2VjaGF0 = JSON.parse(window.localStorage.getItem('d2VjaGF0'));
  var school = window.localStorage.getItem('pc');
  if (!d2VjaGF0){
    d2VjaGF0 = {};
    d2VjaGF0.school = undefined;
  } else if (d2VjaGF0.school === '没绑定学校') {
    d2VjaGF0.school = undefined;
  }
  $scope.$$prevSibling.schoolSelect = school || d2VjaGF0.school || '杭州电子科技大学';
  school = school ? school : d2VjaGF0.school? d2VjaGF0.school : $scope.$$prevSibling.schoolSelect;
  Activity ($http, $scope, school);
}]);
