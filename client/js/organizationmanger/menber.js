var app = angular.module('app',['ui.bootstrap']);
app.controller('headCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.isCollapsed = true;
}]);
app.controller('menberCtrl', ['$scope', '$http', function ($scope, $http) {
    var access_token = JSON.parse(sessionStorage.d2VjaGF0).accessToken;
    var userId = JSON.parse(sessionStorage.d2VjaGF0).userId;
    $http.get('/api/OrganizationMenbers/teaminfo?id=' + userId + '&access_token=' + access_token)
        .success(function (res) {
            $scope.teams = res.info;
            console.log(res);
        });
}]);