var OAuth = require('wechat-oauth');
var config = require('../../server/config');
var client = new OAuth(config.appid, config.appsecret);
module.exports = function(LoginCache) {
	LoginCache.remoteMethod('confirm',
		{
			accepts:{arg:'state',type:'string'},
			description:"微信登录验证,手机,PC端都用这个接口验证",
			http:{path:"/confirm",verb: 'get'}
		});
	LoginCache.beforeRemote('confirm',function(ctx, unused, next){
		var state = ctx.req.query.state;
		if(ctx.req.headers['user-agent'].indexOf('MicroMessenger') > 0)
		{
			LoginCache.find({where:{randstate:state,isConfirm:{gt:0}}},function(err,loginCache){
				if(err) ctx.res.send({status:"err","msg":"出错了,请刷新后登陆"});
				if(loginCache.length > 0)  
					ctx.res.send({status:"success","msg":"获取微信信息成功"});
				ctx.res.send({status:"err","msg":"授权成功,等待获取微信信息"});
			});
		}
		else
		{
			LoginCache.findOne({where:{randstate:state}},function(err,loginInfo){
				if(err) ctx.res.send({"msg":"出错了,请刷新后登陆"});
				 else if(loginInfo === null)
					ctx.res.send({"msg":"非法的请求,请刷新后登陆"});
				else if(loginInfo.code === 0)
					ctx.res.send({"msg":"等待微信授权"});
				else{
					client.getUserByCode(loginInfo.code,codeToUserInfo(err,wechatUserInfo,LoginCache,function(err){
						ctx.res.send(err);
					}));
				}
			});
		}
	});
};
function codeToUserInfo(err,wechatUserInfo,LoginCache,cb){
	if(err) cb({"msg":"出错了,请刷新后登陆"});
	else if(wechatUserInfo.openid === undefined)
		cb({"msg":"获取微信信息失败,请刷新后登陆"});
	else{
		wechatUserInfo.email = wechatUserInfo.openid+"@163.com";
		wechatUserInfo.password = wechatUserInfo.password+"@163.com";
		LoginCache.app.models.WeChatUser.create(wechatUserInfo,function(err,userInfo){
			if(err) cb({"msg":"出错了,请刷新后登陆"});
			LoginCache.updateAll({randstate:state},{isConfirm:1},function(err,count){
				if(err) ctx.res.send(err);
				LoginCache.app.models.WeChatUser.login(
					{
						"password":wechatUserInfo.password,
						"email":wechatUserInfo.email
					},
					function(err,token){
						cb({"msg":"success","url":ctx.req.headers.referer,"userInfo":userInfo,"token":token});
					});
			});
		});
	}
}