var OAuth = require('wechat-oauth');
var config = require('../../server/config');
var client = new OAuth(config.wechat.appid, config.wechat.appsecret);
module.exports = function(options,cb){
	client.getUserByCode(options.code,function(err,wechatUserInfo){
		if(err) cb({"msg":"这个code已经用过了"});
		else if(!wechatUserInfo)
			cb({"msg":"获取微信信息失败,请刷新后登陆"});
		else
			responsePhone(options.userModel.app.models.LoginCache,options.state,options.ctx,function(err){
				if(err) cb(err);
				wechatUserInfo.email = wechatUserInfo.openid+"@163.com";
				wechatUserInfo.password = wechatUserInfo.openid;
				userModel.create(wechatUserInfo,function(err,userInfo){
					if(err) cb({"msg":"保存微信信息失败"});
					options.userInfo = userInfo;
					weLogin(options,cb);
				});
			});
	});
}
function responsePhone(loginModel,state,ctx,cb){
	if(!(ctx.req.headers['user-agent'].indexOf('MicroMessenger') > 0))
		loginModel.updateAll({randstate:state},{isConfirm:1},
			function(err,count){
			if(err) cb({"msg":"手机和PC验证失败"});
			cb(null);
		});
	else
		cb(null);
}
function weLogin(options,cb){
	options.userModel.login(
	{
		"email":options.userInfo.email,
		"password":options.userInfo.openid
	},
	function(err,token){
		cb({"msg":"success","url":options.url,"userInfo":options.userInfo,"token":token});
	});
}
