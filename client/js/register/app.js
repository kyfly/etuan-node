var app = angular.module('app', ['ngResource','w5c.validator']);
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

app.controller('main', ['$scope', '$http', function($scope, $http) {

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

	$scope.user = {
		organizationUserDepartments: [{name: "",description: ""}], //默认的一个部门
		type: '校级社团', //由于select采用ng-model绑定user.type，因此option中的select无法生效，所以要在这设置默认选项。
		school: '全校'	//同user.type
	}

	$scope.addDepart	 = function() {
		$scope.user.organizationUserDepartments.push({name: "",description: ""});
	}

	$scope.delDepart = function(index) {
		$scope.user.organizationUserDepartments.splice(index, 1);
	}

	$scope.register = function() {
		for(var i=0; i< $scope.user.organizationUserDepartments.length; i++) {
			$scope.user.organizationUserDepartments[i].id = i;
		}
		$http.post('/api/OrganizationUsers', $scope.user).
			success(function(data, status, headers, config) {
				alert("注册成功");
			}).
			error(function(data, status, headers, config) {
				alert("注册失败");
			});
	}

}]);