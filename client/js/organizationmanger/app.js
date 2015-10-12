var app = angular.module('app',['ui.bootstrap']);
app.controller('headCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.isCollapsed = true;
}]);
app.controller('infoCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var id = $location.search().id;
    var access_token = JSON.parse(sessionStorage.d2VjaGF0).accessToken;
    var userId = JSON.parse(sessionStorage.d2VjaGF0).userId;
    $http.get('/api/Universities', {filter: {where: {name: '杭州电子科技大学'}}}).success(function (data) {
        $scope.magors = data[0].types[3].schools;
    });
    $http.get('/api/OrganizationMenbers/uinfo?id=' + userId + '&access_token=' + access_token).success(function (res) {
        $scope.user = res.info;
    });
    $http.get('/api/OrganizationUsers/' + id + '/departments')
        .success(function (res) {
            $scope.departments = res;
        }).error(function (res) {
            console.log(res);
        });
    $scope.upload = function () {
        var logoFd = new FormData();
        var logoFile = document.getElementById('headImg').files[0];
        var logoXhr = new XMLHttpRequest();
        $scope.waitetip = true;
        var logoReadyHandle = function () {
            if (logoXhr.readyState === 4) {
                if (logoXhr.status === 200) {
                    var logoUrl = JSON.parse(logoXhr.responseText).url;
                    $scope.$apply(function () {
                        $scope.user.headImg = logoUrl;
                        $scope.waitetip = false;
                        $scope.successtip = true;
                    });
                }
                else {
                    alert("图片上传失败");
                }
            }
        };
        logoFd.append('headImg', logoFile);
        logoXhr.onreadystatechange = logoReadyHandle;
        logoXhr.open('POST', '/ue/uploads?action=uploadimage&dir=logo&access_token=' + access_token, true);
        logoXhr.send(logoFd);
    };
    $scope.saveinfo = function () {
        if (!$scope.user.headImg) {
            alert('照片别忘了');
            return;
        }
        if (!$scope.user.department.name) {
            alert('部门必选');
            return;
        }
        $scope.user.wechatUserId = userId;
        $scope.user.department = $scope.user.department.name;

        $http.post('/api/OrganizationUsers/' + id + '/menbers?access_token=' + access_token, $scope.user).success(function (res) {
            console.log(res);

        });

    };
}]);
