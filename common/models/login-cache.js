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
			LoginCache.find({where:{state:state,isConfirm:{gt:0}}},function(err,result){
				if(err) ctx.res.send(err);
				if(result.length > 0){
					if(new Date().getTime() - result.createAt > 60)
						ctx.res.send({msg:'超时'});
					ctx.res.send({msg:'成功'});
					return;
				} 
				ctx.res.redirect('/waitconfirm.html?state='+state);
			});
		}else{
			LoginCache.find({where:{state:state}},function(err,result){
				if(err) ctx.res.send(err);
				if(result.length > 0 && new Date().getTime() - result.createAt < 60){
					LoginCache.updateAll({where:{state:state}},{isConfirm:1},function(err,count){
						if(err) ctx.res.send(err);
						//在这里登录
						ctx.res.redirect(ctx.req.headers.referer);
					});
				}
				ctx.res.send({msg:'loading'});
			});
		}
	});
};
