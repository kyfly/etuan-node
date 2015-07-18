var app = angular.module('app', ['ngResource', 'w5c.validator']);
window.app = app;

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
  weChat: {
      pattern: "微信公众号名称由字母和数字组成"
  },
  depart_name: {
      required: "输入的部门名称不能为空",
      maxlength: "部门名称最长不超过12位"
  }
});
}]);

app.controller('main', ['$scope', '$http', '$resource',function ($scope, $http, $resource) {

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
  $scope.types = ['校级社团', '校级组织', '院级社团', '院级组织'];

  var schools = [
  '机械工程学院', '电子信息学院', '通信工程学院', '自动化学院', '计算机学院',
  '生命信息与仪器工程学院', '材料与环境工程学院', '软件工程学院', '理学院',
  '经济学院', '管理学院', '会计学院', '外国语学院', '数字媒体与艺术设计学院',
  '人文与法学院', '马克思主义学院', '卓越学院', '信息工程学院', '国际教育学院', '继续教育学院'
  ];

  //下面的这个写法是根据社团属性来动态实现下面学院选择的变化，三元表达式的写法是对if/else模形的简写方式  
  $scope.typeChange = function () {
    $scope.schools = ($scope.user.type === '校级社团' || $scope.user.type === '校级组织') ? ['全校'] : schools;
};

$scope.user = {
    type: "校级社团",
    school: "全校",
    organizationUserDepartments: [{name: "", description: ""}], //默认的一个部门
};

$scope.addDepart = function () {
    $scope.user.organizationUserDepartments.push({name: "", description: ""});
};

$scope.delDepart = function (index) {
    $scope.user.organizationUserDepartments.splice(index, 1);
};

$scope.register = function () {
  for (var i = 0; i < $scope.user.organizationUserDepartments.length; i++) {
    $scope.user.organizationUserDepartments[i].id = i;
}
$http.post('/api/OrganizationUsers', $scope.user).
success(function (data, status, headers, config) {
  alert("注册成功");
  $scope.logoUpload(data);
  // $window.location = '../login';
}).
error(function (data, status, headers, config) {
  alert("注册失败");
});
}

  //上传图片至OSS服务
  $scope.logoUpload = function (data) {
    var Setting = $resource(
        '/api/OrganizationUsers/:userId?access_token='+data.accessToken, {
            userId: data.userId
        },
        {
            'update': { method:'PUT' }
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
logoXhr.open('POST', '/ue/uploads?action=uploadimage&dir=logo&access_token=' + data.accessToken, true);
logoXhr.send(logoFd);
};

}]);