var wechatLogin = require('../modules/wechatLogin');
module.exports = function(LoginCache) {
	LoginCache.remoteMethod('confirm',
		{
			accepts:{arg:'state',type:'string'},
			description:"微信登录验证,手机,PC端都用这个接口验证",
			http:{path:"/confirm",verb: 'get'}
		});
	LoginCache.beforeRemote('confirm',function(ctx, unused, next){
		var state = ctx.req.query.state;
		var url = ctx.req.headers.referer;
		if(ctx.req.headers['user-agent'].indexOf('MicroMessenger') > 0){
console.log(state)
			LoginCache.findOne({where:{randstate:state}},function(err,loginCache){
				if(err) ctx.res.send({status:"err","msg":"请刷新后再试"});
				else if(loginCache === null)
					ctx.res.send({status:"err","msg":"二维码可能过期了"});
				else if(loginCache.isConfirm > 0)  
					ctx.res.send({status:"success","msg":"获取微信信息成功"});
				else if(new Date() - loginCache.createAt > 80*1000){
				//	console.log(new Date() - loginCache.createAt,new Date(),loginCache);  
					ctx.res.send({status:"err","msg":"超过80秒了"});
				}else
					ctx.res.send({status:"err","msg":"授权成功,等待获取微信信息"});
			});
	}	else
			LoginCache.findOne({where:{randstate:state}},function(err,loginInfo){
				if(err) ctx.res.send({"msg":"请刷新后再试"});
				else if(loginInfo === null)
					ctx.res.send({"msg":"非法的请求,请刷新后登陆"});
				else if(loginInfo.code === 0)
					ctx.res.send({"msg":"等待微信授权"});
				// else if(loginInfo.code != 0)
				// 	ctx.res.send({"msg":"授权成功,等待获取微信信息"});
				else{
					var options = {
						code:loginInfo.code,
						userModel:LoginCache.app.models.WeChatUser,
						referer:url,
						ctx:ctx,
						state:state
					};
					wechatLogin(options,function(signMsg){
						console.log(signMsg);
							ctx.res.send(signMsg);
						});
				}
			});
	});
};
