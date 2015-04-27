var OAuth = require('wechat-oauth');
var config = require('../../server/config');
var wechatLogin = require('../modules/wechatLogin');
var hduConfim = require('../modules/hdu-student.js');
var client = new OAuth(config.wechat.appid, config.wechat.appsecret);
function __randomString(len){
  len = len || 32;
  var $chars = 'ABCDEFGHJoOLl9gqVvUuI1KMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
module.exports = function(WeChatUser) {
	WeChatUser.remoteMethod("wechatLogin",
		{
			returns:{arg:"data",type:"object"},
			description:"获取微信登录链接,返回{state:state,url:url}",
			http: {path:"/wechatlogin",verb: 'get'}
		});
	WeChatUser.remoteMethod("oauth",
		{
			accepts:[{arg:'code',type:'string'},
				{arg:'state',type:'string'}],
			http: {path:"/oauth",verb: 'get'}
		});
	WeChatUser.remoteMethod("phoneoauth",
		{
			accepts:[{arg:'code',type:'string'},
				{arg:'state',type:'string'}],
			http: {path:"/phoneoauth",verb: 'get'}
		});
	/**
	 * 微信用户获取oauth2.0链接接口
	 * method get
	 * @param  {[type]} ctx          [description]
	 * @param  {[type]} unused       [description]
	 * @param  {String} next){		var referer       [description]
	 * @return {[type]}              [description]
	 */
	WeChatUser.beforeRemote("wechatLogin",function(ctx, unused, next){
		if(ctx.req.headers.referer) 
			var referer = ctx.req.headers.referer;
		else
			var referer = 'http://'+ctx.req.hostname+':3000';
		var state = __randomString(40)+ new Date().getTime().toString();
		var loginCacheObj = {
			createAt:new Date(),
			randstate:state,
			isConfirm:0,
			code:0
		};
		WeChatUser.app.models.LoginCache.create(loginCacheObj,function(err,result){
			if(err)
				ctx.res.send(err);
			if(ctx.req.headers['user-agent'].indexOf('MicroMessenger') > 0)
				ctx.res.redirect(client.getAuthorizeURL('http://'+ctx.req.hostname+':3000/api/WeChatUsers/phoneoauth?referer='+referer, state, 'snsapi_userinfo'));
			else{
				var url = client.getAuthorizeURL('http://'+ctx.req.hostname+':3000/api/WeChatUsers/oauth?referer='+referer, state, 'snsapi_userinfo');
				ctx.res.render('./sign-in.ejs',{state:state,qrcodeUrl:url});
			}
		});
	});
	/**
	 * 手机微信用户oauth2.0登录接口
	 * url /api/WeChatUsers/phoneoauth?code=CODE
	 * get code=CODE
	 * @param  {[type]} code 从微信服务器返回
	 * @return 登录前请求页面
	 */
	WeChatUser.beforeRemote("phoneoauth",function(ctx, unused, next){
		var referer = ctx.req.query.referer;
		var code = ctx.req.query.code;
		var options = {
			code:code,
			userModel:WeChatUser,
			referer:referer,
			ctx:ctx
		};
		wechatLogin(options,function(signMsg){
			//需要手机中转页面，未完成
			ctx.res.send(signMsg);
		});
	});
	/**
	 * 微信oauth2.0回调地址
	 * url /api/WeChatUsers/oauth?code=CODE&state=STATE
	 * get code=CODE&state=STATE
	 * @param  {[type]} state 生成oauth2.0链接时生成state                                                                                                 [description]
	 * @param  {[type]} code 从微信服务器返回  
	 * @return { msg:"some msg"} 当返回msg为success时表示成功，其他可以直接展示给用户                                                                                          [description]
	 */
	WeChatUser.beforeRemote("oauth",function(ctx, unused, next){
		var query = ctx.req.query;
		var state = query.state;
		WeChatUser.app.models.LoginCache.find({where:{randstate:query.state}},function(err,loginCache){
			if(err)
				ctx.res.render("./phone.ejs",{"msg":"出错了,请刷新后登陆"});
			else if(loginCache.length == 0)
				ctx.res.render("./phone.ejs",{"msg":"非法的请求"});
			else
			WeChatUser.app.models.LoginCache.updateAll(
				{randstate:state},
				{code:query.code},
				function(err,count){
					if(err)
						ctx.res.render("./phone.ejs",{"msg":"出错了,请刷新后登陆"});
					else
						ctx.res.render("./phone.ejs",{"msg":"success","state":state});
				});
		});
	});

  /**学号验证
   * url /api/WeChatUsers/:userId
   * put {"studentId":学号,"password":"密码"}
   * @return model的一个实例
   */
  WeChatUser.beforeRemote("prototype.updateAttributes",function(ctx, instance, next){
  	var data = ctx.req.body;
  	var access_token = ctx.req.accessToken;
  	if(data.studentId === undefined || data.password === undefined)
  		ctx.res.send({"err":"密码学号都不能为空"});
  	else
  	hduConfim.ihdu(data.studentId,data.password,function(name){
		if(!name) ctx.res.send({"err":"获取学生姓名失败"});
		if(name === 'mistake_notice') ctx.res.send({err:'密码或学号错误'});
		else
		WeChatUser.findOne({where:{id:access_token.userId}},function(err,userInfo){
			updatedAt = userInfo.updatedAt || new Date();
			histories = userInfo.weChatUserHistories;
			data.studentName = name;	
			data.university  = '杭州电子科技大学';
			data.updatedAt = new Date();
			data.verifiedDate = new Date();
			var history = {
				 	"university": data.university,
			      	"studentId": data.studentId,
			      	"studentName": name,
			      	"verifiedDate": new Date(),
			      	"updatedAt": updatedAt,
			      	"id":histories.length+1
			}
			histories.push(history);
			data.weChatUserHistories = histories;
			next();
		});
  	});
  });


  //保存更新时间
  WeChatUser.observe('before save', function(ctx, next) {
    if(ctx.instance) {
      ctx.instance.updatedAt = new Date();
    }
    else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });

  //创建表单结果之前写入ip
  WeChatUser.beforeRemote('prototype.__create__formResults', function(ctx, instance, next) {
  	ctx.req.body.ip = getClientIp(ctx.req);
  	next();
  });

  //创建投票结果之前写入ip
  WeChatUser.beforeRemote('prototype.__create__formResults', function(ctx, instance, next) {
  	ctx.req.body.ip = getClientIp(ctx.req);
  	next();
  });

  //修改accesstoken有效时间
  WeChatUser.beforeRemote('login', function(ctx, instance, next) {
  	ctx.req.body.ttl = 7200;
  	next();
  });

  function getClientIp(req) {
      return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  };  

};
// {
//   "id": "FzSvMzLHvgdrrIK3HDoX7uyya8ysr7QoPt0YuDtDBa9s0AYZ1BsrPaVpELWHwMRX",
//   "ttl": 1209600,
//   "created": "2015-04-20T10:00:31.236Z",
//   "userId": "5534ce317f6ac78c11054114"
// }
