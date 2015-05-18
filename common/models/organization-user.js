module.exports = function(OrganizationUser) {

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
							cb(null, {status: '200', actCount: actCount});
						});
					});
				});
			});	
		});
	}

	OrganizationUser.remoteMethod('actCount', {
		accepts: {arg: 'token', type: 'String'},
		returns: {arg: 'actCount', type: 'Object'},
		http: {verb: 'get'}
	});

	//浏览人数
	OrganizationUser.viewCount = function(token, cb) {
		accessTokenCheck(token, cb, function(organizationUser) {
			var Form = OrganizationUser.app.models.Form;
			var Vote = OrganizationUser.app.models.Vote;
			var Seckill = OrganizationUser.app.models.Seckill;
			Form.find({where:{organizationUid: organizationUser.id}}, function(err, forms) {
				var viewCount = 0;
				forms.forEach(function(form){
					viewCount += form.viewCount;
				});
				Vote.find({where:{organizationUid: organizationUser.id}}, function(err, votes) {
					votes.forEach(function(vote){
						viewCount += vote.viewCount;
					});
					Seckill.find({where:{organizationUid: organizationUser.id}}, function(err, seckills) {
						seckills.forEach(function(seckill){
							viewCount += seckill.viewCount;
						});
						cb(null, {status: 200, viewCount: viewCount})			
					});
				});	
			});
		});	
	};

	OrganizationUser.remoteMethod('viewCount', {
		accepts: {arg: 'token', type: 'String'},
		returns: {arg: 'viewCount', type: 'Object'},
		http: {verb: 'get'}
	});

	//参与人数
	OrganizationUser.parCount = function(token, cb) {
		accessTokenCheck(token, cb, function(organizationUser) {
			var Form = OrganizationUser.app.models.Form;
			var FormResult = OrganizationUser.app.models.FormResult;
			var Vote = OrganizationUser.app.models.Vote;
			var VoteResult = OrganizationUser.app.models.VoteResult;
			var Seckill = OrganizationUser.app.models.Seckill;
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
		accepts: {arg: 'token', type: 'String'},
		returns: {arg: 'parCount', type: 'Object'},
		http: {verb: 'get'}
	});

	//获取组织列表，返回特定的字段，防止敏感信息外泄
	OrganizationUser.list = function(cb) {
		OrganizationUser.find({ fields: {id:1, name: 1, logoUrl: 1, type: 1, school: 1} }, function(err, orgs) {
			if(err)
				cb(null, '获取组织列表失败');
			else
				cb(null, JSON.stringify(orgs));
		});
	};

	OrganizationUser.remoteMethod('list', {
		returns: {arg: 'orgs', type: 'String'},
		http: {verb: 'get'}
	});

	//获取某一组织的详细信息，返回特定字段，防止敏感信息外泄
	OrganizationUser.detail = function(id, cb) {
		OrganizationUser.findOne({ where: {id: id}, fields: {id: 1, logoUrl: 1, description: 1, departments: 1, name: 1, photoUrl: 1} }, function(err, org) {
			if(err)
				cb(null, '获取组织详情失败');
			else
				cb(null, JSON.stringify(org))
		});
	}

	OrganizationUser.remoteMethod('detail', {
		accepts: {arg: 'id', type: 'String'},
		returns: {arg: 'org', type: 'String'},
		http: {verb: 'get', path: '/detail/:id'}
	});

	function accessTokenCheck(token, cb, callback) {
		var AccessToken = OrganizationUser.app.models.AccessToken;
		AccessToken.findOne({where:{_id: token}}, function(err, accessToken) {
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
};
