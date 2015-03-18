var OAuth = require('wechat-oauth');
var config = require('../../server/config');
var client = new OAuth(config.appid, config.appsecret);
module.exports = function(LoginCache) {
	LoginCache.remoteMethod('confirm',
		{
			accepts:{arg:'state',type:'string'},
			http:{path:"/confirm",verb: 'get'}
		});
	LoginCache.beforeRemote('confirm',function(ctx, unused, next){
		var state = ctx.req.query.state;
		if(ctx.req.headers['user-agent'].indexOf('MicroMessenger') > 0)
		{
			LoginCache.find({where:{state:state,isConfirm:{gt:0}}},function(err,loginCache){
				if(err) ctx.res.send(err);
				if(loginCache.length > 0)  
					ctx.res.send({"msg":"获取微信信息成功"});

				ctx.res.send({"msg":"授权成功,等待获取微信信息"});
			});
		}
		else
		{
			LoginCache.find(
				{where:{state:state}},
				function(err,loginCache){
					if(err) ctx.res.send(err);
					else if(loginCache.length <= 0)
						ctx.res.send({"msg":"非法的请求"});
					else if(new Date().getTime() - loginCache[0].createAt.getTime() > 60)
						ctx.res.send({"msg":"超过60秒无操作"});
					else if(loginCache[0].code === 0)
						ctx.res.send({"msg":"等待微信授权"});
					else
					{
						client.getUserByCode(loginCache[0].code,
							function(err,wechatUserInfo){
								if(err) ctx.res.send(err);
								else if(wechatUserInfo === undefined && wechatUserInfo.length <= 0)
									ctx.res.send({"msg":"获取微信信息失败"});
								else
								{
									wechatUserInfo.email = wechatUserInfo.openid+"@163.com";
									wechatUserInfo.password = wechatUserInfo.password+"@163.com";
									LoginCache.app.models.WeChatUser.create(wechatUserInfo,
										function(err,result){
											if(err) ctx.res.send(err);
											LoginCache.updateAll({where:{state:state}},
												{isConfirm:1},
												function(err,count){
													if(err) ctx.res.send(err);
													WeChatUser.login(
														{
															"password":wechatUserInfo.password,
															"email":wechatUserInfo.email
														},
														function(err,token){
															ctx.res.redirect(ctx.req.headers.referer);
														});
												});
										});
								}
							});
					}
				});
		}
	});
};
