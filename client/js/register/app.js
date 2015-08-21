var app = angular.module('app', ['ngResource', 'w5c.validator']);
window.app = app;

app.controller('headCtrl', ['$scope', function ($scope) {
  $scope.isCollapsed = true;
}]);

app.config(["w5cValidatorProvider", function (w5cValidatorProvider) {

// 全局配置
  w5cValidatorProvider.config({
    blurTrig: false,
    showError: true,
    removeError: true
  });

  w5cValidatorProvider.setRules({
    email: {
      required: "输入的邮箱地址不能为空",
      email: "输入邮箱地址格式不正确",
      w5cuniquecheck: "该邮箱已经被注册"
    },
    password: {
      required: "输入的密码不能为空",
      maxlength: "密码最长不能超过16位",
      minlength: "密码最短不能小于6位"
    },
    password_verify: {
      repeat: "两次输入的密码不相同"
    },
    phone: {
      required: "输入的手机号码不能为空",
      maxlength: "请输入11位手机号码",
      minlength: "请输入11位的手机号码",
      number: "手机号码是由11位数字组成"
    },
    phone_short: {
      maxlength: "请输入6位短号",
      minlength: "请输入6位短号",
      number: "短号是由6位数字组成"
    },
    name: {
      required: "输入的组织名称不能为空",
      maxlength: "社团名称长度不能超过12位",
      w5cuniquecheck: "该组织名称已被使用"
    },
    description: {
      required: "输入的组织描述不能为空",
      maxlength: "组织描述长度不能超过200位"
    },
    depart_name: {
      required: "输入的部门名称不能为空",
      maxlength: "部门名称最长不超过12位"
    }
  });
}]);

app.controller('main', ['$scope', '$http', '$resource', function ($scope, $http, $resource) {
  $scope.isCollapsed = true;

  var vm = $scope.vm = {
    htmlSource: "",
    showErrorType: 1
  };

//每个表单的配置，如果不设置，默认和全局配置相同
  vm.validateOptions = {
    blurTrig: true
  };

  vm.changeShowType = function () {
    if (vm.showErrorType == 2) {
      vm.validateOptions.showError = false;
      vm.validateOptions.removeError = false;
    } else {
      vm.validateOptions.showError = true;
      vm.validateOptions.removeError = true;
    }
  };
//初始化设定current，使得第一个注册界面出现
  $scope.current = 'createId';

//刚进入页面获取所有学校列表，并初始化$scope.user.university
  $http.get('/api/Universities?filter[fields][name]=true').
    success(function (data, status, header, config) {
      var universities = [];
      data.map(function (university) {
        universities.push(university.name);
      });
      $scope.universities = universities;
      $scope.user.university = $scope.universities[0];
      $scope.universityChange();
    })
    .error(function (data, status, header, config) {
      alert("获取学校信息失败");
    });

  $scope.universityChange = function () {
    $http.get('/api/Universities?filter[where][name]=' + $scope.user.university + '&filter[fields][types]=true')
      .success(function (data, status, header, config) {
        var types = [];
        data[0].types.map(function (type) {
          types.push(type);
        });
        $scope.types = types;
        $scope.schools = $scope.types[0].schools;
        $scope.user.type = $scope.types[0].name;
        $scope.user.school = $scope.types[0].schools[0];
      })
      .error(function (data, status, header, config) {
        alert("获取类别失败");
      });
  };

//改变类别的时候改变schools下拉框里面的内容
  $scope.typeChange = function () {
    for (var i = 0; i < $scope.types.length; i++) {
      if ($scope.types[i].name === $scope.user.type) {
        $scope.schools = $scope.types[i].schools;
        break;
      }
    }
    $scope.user.school = $scope.schools[0];
  };

  $scope.user = {
    organizationUserDepartments: [{name: "", description: ""}] //默认的一个部门
  };

  $scope.addDepart = function () {
    $scope.user.organizationUserDepartments.push({name: "", description: ""});
  };

  $scope.delDepart = function (index) {
    $scope.user.organizationUserDepartments.splice(index, 1);
  };
  $scope.codeStatus = '获取验证码';
  $scope.getCode = function () {
    var email = $scope.user.email;
    if (email) {
      $http.get('/api/OrganizationUsers/confirmCode?email=' + email)
        .success(function (data) {
          $scope.user.code = data.code;
          $scope.codeStatus = '请查看邮箱';
        })
        .error(function (data) {

        });
    }
    else {
      alert('邮箱不能为空');
    }
  };
  $scope.checkCode = function () {
    console.log($scope.confirmCode);
    console.log($scope.user.code);
    if (($scope.user.confirmCode === $scope.user.code) && ($scope.user.confirmCode != undefined)) {
      $scope.helpBlock = '通过验证';
      $scope.confirm = true;
    }
    else {
      $scope.helpBlock = '验证码错误';
      $scope.codeStatus = '获取验证码';
    }

  };
  $scope.updateCode = function () {
    $scope.confirm = false;
    $scope.user.confirmCode = $scope.user.code = undefined;
  };
  $scope.register = function () {
    if($scope.user.confirmCode === undefined){
      alert('请先填写第一页的验证码');
      return false;
    }

    for (var i = 0; i < $scope.user.organizationUserDepartments.length; i++) {
      $scope.user.organizationUserDepartments[i].id = i;
    }
    $http.post('/api/OrganizationUsers', $scope.user).
      success(function (data, status, headers, config) {
        $scope.logoUpload(data);
        var lsTmp = {
          accessToken: data.id,
          userId: data.userId,
          loginTime: data.created,
          ttl: data.ttl
        };
        window.localStorage.setItem('b3JnYW5p', JSON.stringify(lsTmp));
        alert("注册成功！");
        window.location = '/admin';
      }).
      error(function (data, status, headers, config) {
        alert("注册失败");
      });
  };

//上传图片至OSS服务
  $scope.logoUpload = function (data) {
    var Setting = $resource(
      '/api/OrganizationUsers/:userId?access_token=' + data.id, {
        userId: data.userId
      },
      {
        'update': {method: 'PUT'}
      }
    );
    var logoFd = new FormData();
    var logoFile = document.getElementById('logo').files[0];
    var logoXhr = new XMLHttpRequest();
    var fileExt = /\.[^\.]+/.exec(document.getElementById('logo').value.toLowerCase());
    if (!((fileExt == '.png') || (fileExt == '.jpg') || (fileExt == '.jpeg') || (fileExt == '.gif'))) {
      alert('请确认您上传的logo文件格式是jpg、png、gif或jpeg');
      return false;
    }
    var logoReadyHandle = function () {
      if (logoXhr.readyState === 4) {
        if (logoXhr.status === 200) {
          var logoUrl = JSON.parse(logoXhr.responseText).url;
          Setting.update({logoUrl: logoUrl});
        }
        else {
          alert("图片上传失败,请登录后尝试上传!");
        }
      }
    };
    logoFd.append('logo', logoFile);
    logoXhr.onreadystatechange = logoReadyHandle;
    logoXhr.open('POST', '/ue/uploads?action=uploadimage&dir=logo&access_token=' + data.id, true);
    logoXhr.send(logoFd);
  };

}]);