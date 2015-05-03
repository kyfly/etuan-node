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
				isSign_up(options.userModel,wechatUserInfo,function(err,userInfo){
console.log(userInfo);
					if(err) cb(err);
					else{
						options.userInfo = userInfo;
						weLogin(options,cb);
					}
				});
			});
	});
}
function isSign_up(userModel,userInfo,cb){
  	userModel.findOne({where:{openid:userInfo.openid}},function(err,userinfo){
		if(userinfo === null)
			notSign_up(userModel,userInfo,function(err,userinfo){
				if(err) cb(err);
				cb(null,userinfo);
			});
		else
			cb(null,userinfo);
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
function notSign_up(userModel,userInfo,cb){
	userInfo.email = userInfo.openid+"@163.com";
	userInfo.password = userInfo.openid;
	userModel.create(userInfo,function(err,userInfo){
		if(err) cb({"msg":"保存微信信息失败"});
		else cb(null,userInfo);
	});
}
function weLogin(options,cb){
	options.userModel.login(
	{
		"email":options.userInfo.email,
		"password":options.userInfo.openid
	},
	function(err,token){
console.log(err,token);
		cb({"msg":"success","url":options.url,"userInfo":options.userInfo,"token":token});
	});
}
