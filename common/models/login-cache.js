module.exports = function(LoginCache) {
	LoginCache.confirm = function(ctx, unused, next){
		var state = ctx.req.query.state;
		if(ctx.req.headers['user-agent'].indexOf('MicroMessenger') > 0)
			LoginCache.findOne({where:{ticket:state}},function(err,cache){
				if(err) ctx.res.send({status:"err","msg":"请刷新二维码后再试"});
				else if(!cache)
					ctx.res.send({status:"err","msg":"二维码可能过期了"});
				else if(cache.isConfirm > 0)  
					ctx.res.send({status:"success","msg":"获取微信信息成功"});
				else if(new Date() - cache.createAt > 80*1000){
					ctx.res.send({status:"err","msg":"超过80秒了"});
				}else
					ctx.res.send({status:"err","msg":"授权成功,等待获取微信信息"});
			});
		else
			LoginCache.findOne({where:{ticket:state}},function(err,cache){
				if(err) ctx.res.send({"msg":"请刷新后再试"});
				else if(!cache)
					ctx.res.send({"msg":"二维码可能过期,请刷新后登陆"});
				else if(cache.isConfirm > 0){
					LoginCache.app.models.WeChatUser.findById(cache.userId,function (err, user){
						if(err) ctx.res.send({"msg":"获取微信信息失败"});
						else
							LoginCache.app.models.WeChatUser.reLoadLogin(user.openid,function (err, token){
			        	if (err)
			        		ctx.res.send({"msg": "fail"});
			        	else	{
			        		user.email = undefined;
			          	ctx.res.send({"msg": "success", "userInfo": user,"token": token});
			        	}
			        });
					})
				}
				else 
					ctx.res.send({"msg":"请用微信扫描二维码"});
			});
	};
};
