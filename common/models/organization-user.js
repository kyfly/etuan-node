var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(
	{
		service:'163',
		auth: {
			user: 'erchuochuo@163.com',
			//pass: 'yjzzivspsozpycgw'
			pass: "liu762022369"
		}
});
function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJoOLl9gqVvUuI1KMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
module.exports = function(OrganizationUser) {
	OrganizationUser.confirmCode = function (email, cb) {
		var randCode = randomString(13);
		transporter.sendMail({
			type: 'email',
			from: 'erchuochuo@163.com',
      to: email,
      subject:'团团一家注册验证',
			text: "你的验证码为" + randCode,
		},function (err, r) {
			if (err)
				cb(err.response);
			else if (r)
				cb(null, randCode);
			else if (err)
				cb('请检查邮箱是否正确');
		});
	}
	OrganizationUser.remoteMethod('confirmCode', {
		accepts: {arg: 'email', type: 'string'},
		returns: {arg: 'code', type: 'string'},
		http: {verb: 'get', path: '/confirmcode'}
	});

	OrganizationUser.beforeRemote ('prototype.__get__forms', function (ctx, instance, next) {
		var Form = OrganizationUser.app.models.Form;
		Form.find(
			{where: {organizationUid: ctx.req.remotingContext.ctorArgs.id},
			fields: {id: true, title: true, startTime: true, stopTime: true,viewCount: true}
		}, function (err, ins) {
			if (err)
				ctx.res.send({err: err.message});
			else
				ctx.res.send({list: ins})
		});
	});
	OrganizationUser.beforeRemote ('prototype.__get__activities', function (ctx, instance, next) {
		var Activity = OrganizationUser.app.models.Activity;
		Activity.find({
			where: {organizationUid: ctx.req.remotingContext.ctorArgs.id},
			fields: {id: true, title: true, startTime: true, stopTime: true,viewCount: true}
		}, function (err, ins) {
			if (err)
				ctx.res.send({err: err.message});
			else
				ctx.res.send({list: ins})
		});
	});
	OrganizationUser.beforeRemote ('prototype.__get__seckills', function (ctx, instance, next) {
		var Seckill = OrganizationUser.app.models.Seckill;
		Seckill.find({where: {organizationUid: ctx.req.remotingContext.ctorArgs.id},
		fields: {id: true, title: true, seckillArrangements: true,viewCount: true}
	}, function (err, ins) {
			if (err)
				ctx.res.send({err: err.message});
			else
				ctx.res.send({list: ins})
		});
	});
	OrganizationUser.beforeRemote ('prototype.__get__votes', function (ctx, instance, next) {
		var Vote = OrganizationUser.app.models.Vote;
		Vote.find({
			where: {organizationUid: ctx.req.remotingContext.ctorArgs.id},
			fields: {id: true, title: true, startTime: true, stopTime: true,viewCount: true}
		}, function (err, ins) {
			if (err)
				ctx.res.send({err: err.message});
			else
				ctx.res.send({list: ins})
		});
	});
	//正在进行活动
	OrganizationUser.actCount = function(token, cb) {
		var Form = OrganizationUser.app.models.Form;
		var Vote = OrganizationUser.app.models.Vote;
		var Seckill = OrganizationUser.app.models.Seckill;
		var Activity = OrganizationUser.app.models.Activity;
		accessTokenCheck(token, cb, function(organizationUser) {
			var actCount = 0;
			Form.find({where: {organizationUid: organizationUser.id, startTime: {lt: Date.now()}, stopTime: {gt: Date.now()}}}, {id: 1}, function(err, forms) {
				actCount += forms.length;
				Vote.find({where: {organizationUid: organizationUser.id, startTime: {lt: Date.now()}, stopTime: {gt: Date.now()}}}, {id: 1}, function(err, votes) {
					actCount += votes.length;
					Seckill.find({where: {organizationUid: organizationUser.id, startTime: {lt: Date.now()}, stopTime: {gt: Date.now()}}}, {id:1}, function(err, seckills) {
						actCount += seckills.length;
						Activity.find({where: {organizationUid: organizationUser.id, startTime: {lt: Date.now()}, stopTime: {gt: Date.now()}}}, {id: 1}, function(err, activities) {
							actCount += activities.length;
							cb(null, {status: 200, actCount: actCount});
						});
					});
				});
			});
		});
	}

	OrganizationUser.remoteMethod('actCount', {
		accepts: {arg: 'access_token', type: 'string'},
		returns: {arg: 'actCount', type: 'string'},
		http: {verb: 'get'}
	});

	//浏览人数
	OrganizationUser.viewCount = function(token, cb) {
		var Form = OrganizationUser.app.models.Form;
		var Vote = OrganizationUser.app.models.Vote;
		var Seckill = OrganizationUser.app.models.Seckill;
		var Activity = OrganizationUser.app.models.Activity;
		accessTokenCheck(token, cb, function(organizationUser) {
			Form.find({where:{organizationUid: organizationUser.id}}, function(err, forms) {
				var viewCount = 0;
				forms.forEach(function(form){
					viewCount += Number(form.viewCount);
				});
				Vote.find({where:{organizationUid: organizationUser.id}}, function(err, votes) {
					votes.forEach(function(vote){
						viewCount += Number(vote.viewCount);
					});
					Seckill.find({where:{organizationUid: organizationUser.id}}, function(err, seckills) {
						seckills.forEach(function(seckill){
							viewCount += Number(seckill.viewCount);
						});
						Activity.find({where:{organizationUid: organizationUser.id}}, function(err, activities) {
							activities.forEach(function(activity) {
								viewCount += Number(activity.viewCount);
							});
							cb(null, {status: 200, viewCount: viewCount});
						});
					});
				});
			});
		});
	};

	OrganizationUser.remoteMethod('viewCount', {
		accepts: {arg: 'access_token', type: 'string'},
		returns: {arg: 'viewCount', type: 'string'},
		http: {verb: 'get'}
	});

	//参与人数
	OrganizationUser.parCount = function(token, cb) {
		accessTokenCheck(token, cb, function(organizationUser) {
			var Form = OrganizationUser.app.models.Form;
			var Vote = OrganizationUser.app.models.Vote;
			var Seckill = OrganizationUser.app.models.Seckill;
			var FormResult = OrganizationUser.app.models.FormResult;
			var VoteResult = OrganizationUser.app.models.VoteResult;
			var SeckillResult = OrganizationUser.app.models.SeckillResult;
			Form.find({where:{organizationUid: organizationUser.id}}, function(err, forms) {
				var parCount = 0;
				var formIds = [];
				forms.forEach(function(form){
					formIds.push(form.id);
				});
				FormResult.find({where: {formId: {inq: formIds}}}, {id: 1}, function(err, formResults) {
					parCount += formResults.length;
					Vote.find({where:{organizationUid: organizationUser.id}}, function(err, votes) {
						var voteIds = [];
						votes.forEach(function(vote) {
							voteIds.push(vote.id);
						});
						VoteResult.find({where: {voteId: {inq: voteIds}}}, {id: 1}, function(err, voteResults) {
							parCount += voteResults.length;
							Seckill.find({where:{organizationUid: organizationUser.id}}, function(err, seckills) {
								var seckillIds = [];
								seckills.forEach(function(seckill){
									seckillIds.push(seckill.id);
								});
								SeckillResult.find({where: {seckillId: {inq: seckillIds}}}, function(err, seckillResults) {
									parCount += seckillResults.length;
									cb(null, {status: 200, parCount: parCount});
								});
							});
						});
					});
				});
			});
		});
	};

	OrganizationUser.remoteMethod('parCount', {
		accepts: {arg: 'access_token', type: 'string'},
		returns: {arg: 'parCount', type: 'string'},
		http: {verb: 'get'}
	});

	//获取组织列表，返回特定的字段，防止敏感信息外泄
	OrganizationUser.list = function(cb) {
		OrganizationUser.find({ fields: {id:1, name: 1, logoUrl: 1, type: 1, university: 1,school: 1, internalOrder: 1} }, function(err, orgs) {
			if(err)
				cb(null, '获取组织列表失败');
			else
				cb(null, JSON.stringify(orgs));
		});
	};

	OrganizationUser.remoteMethod('list', {
		returns: {arg: 'orgs', type: 'string'},
		http: {verb: 'get'}
	});

	//获取某一组织的详细信息，返回特定字段，防止敏感信息外泄
	OrganizationUser.detail = function(id, cb) {
		OrganizationUser.findOne({ where: {id: id}, fields: {id: 1, logoUrl: 1, description: 1, organizationUserDepartments: 1, name: 1, photoUrl: 1} }, function(err, org) {
			if(err)
				cb(null, '获取组织详情失败');
			else
				cb(null, JSON.stringify(org))
		});
	}

	OrganizationUser.remoteMethod('detail', {
		accepts: {arg: 'id', type: 'string'},
		returns: {arg: 'org', type: 'string'},
		http: {verb: 'get', path: '/detail/:id'}
	});

	function accessTokenCheck(token, cb, callback) {
		var AccessToken = OrganizationUser.app.models.AccessToken;
		//由于下面findOne非常奇怪，如果token是undefined那么会找到第一个accessToken，所以我用||判断了一下
		token = token || null;
		AccessToken.findOne({where: {id: token} }, function(err, accessToken) {
			if(accessToken) {
				OrganizationUser.findOne({where: {_id: accessToken.userId}}, function(err, organizationUser) {
					if(organizationUser) {
						callback(organizationUser);
					}
				});
			}
			else {
				cb(null, {statuc: '500', content: "非法的AccessToken"});
			}
		});
	}

	OrganizationUser.remoteMethod('emailExist', {
		accepts: {arg: 'email', type: 'string'},
		returns: {arg: 'exist', type: 'boolean'},
		http: {verb: 'get', path: '/email/exist'}
	});

	OrganizationUser.beforeRemote('emailExist', function(ctx, instance, next) {
		OrganizationUser.findOne({where: {email: ctx.req.query.email} }, function(err, organizationUser) {
			if(err || organizationUser)
				ctx.res.end('true');
			else
				ctx.res.end('false');
		})
	});

	OrganizationUser.remoteMethod('nameExist', {
		accepts: {arg: 'name', type: 'string'},
		returns: {arg: 'exist', type: 'boolean'},
		http: {verb: 'get', path: '/name/exist'}
	});

	OrganizationUser.beforeRemote('nameExist', function(ctx, instance, next) {
		OrganizationUser.findOne({where: {name: ctx.req.query.name} }, function(err, organizationUser) {
			if(err || organizationUser)
				ctx.res.end('true');
			else
				ctx.res.end('false');
		})
	});
	OrganizationUser.beforeRemote('create', function(ctx, instance, next) {
		if (!ctx.req.body.code)
			ctx.res.send({status:400});
		next();
	});
	OrganizationUser.afterRemote('create', function(ctx, instance, next) {
		OrganizationUser.login({
		 email: instance.email,
		 password: ctx.req.body.password,
		 ttl: 7200
		}, function (err, accessToken) {
		 ctx.res.end(JSON.stringify(accessToken));
		});
	});



	  //保存更新时间
	  OrganizationUser.observe('before save', function(ctx, next) {
	    if(ctx.instance) {
	      ctx.instance.updatedAt = new Date();
	    }
	    else {
	      ctx.data.updatedAt = new Date();
	    }
	    next();
	  });

  //修改accesstoken有效时间
  OrganizationUser.beforeRemote('login', function(ctx, instance, next) {
  	ctx.req.body.ttl = 7200;
  	next();
  });
  
  //帮用户修改密码
  OrganizationUser.resetpwd = function(email, oldpwd, newpwd, cb) {
	  newpassword = OrganizationUser.hashPassword(newpwd);//加密
	  OrganizationUser.findOne({where: {email: email}}, function (err, userInstance) {
	  	if (err)
	  		cb(err.message);
	  	else if (!userInstance)
	  		cb('不存在改邮箱');
	  	else
	  		userInstance.hasPassword(oldpwd, function (err, isMatch) {
	  			if (isMatch)
	  				OrganizationUser.updateAll(
			  			{email:email} ,
			  			{password:newpassword},
			  			function(err,info){
			  				if(err)
									cb('修改密码失败' + err.message);
								else
									cb(null, 'success');
			  			}
			  		);
	  			else
	  				cb('原密码不对');
	  		});
	  });
	};

	OrganizationUser.remoteMethod('resetpwd', {
		accepts: [
			{arg: 'email', type: 'string'},
			{arg: 'oldpwd', type: 'string'},
			{arg: 'newpwd', type: 'string'}
		],
		returns: {arg: 'status', type: 'string'},
		http: {verb: 'post', path: '/resetpwd'}
	});
	OrganizationUser.rePwd = function (email, newpwd, cb) {
		newpassword = OrganizationUser.hashPassword(newpwd);
		OrganizationUser.findOne({where: {email: email}}, function (err, userInstance) {
	  	if (err)
	  		cb(err.message);
	  	else if (!userInstance)
	  		cb('不存在改邮箱');
	  	else
	  		OrganizationUser.updateAll(
	  			{email:email} ,
	  			{password:newpassword},
	  			function(err,info){
	  				if(err)
							cb(err.message);
						else
							cb(null, 'success');
	  			}
	  		);
	  });
	}
	OrganizationUser.remoteMethod('rePwd', {
		accepts: [
			{arg: 'email', type: 'string'},
			{arg: 'newpwd', type: 'string'}
		],
		returns: {arg: 'status', type: 'string'},
		http: {verb: 'post', path: '/rePwd'}
	});
  
};
