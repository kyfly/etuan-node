var OAuth = require('wechat-oauth');
var config = require('../../server/config');
var QRcode = require('qrcode');
var wechatLogin = require('../modules/wechatLogin');
var hduConfim = require('../modules/hdu-student.js');
var client = new OAuth(config.appid, config.appsecret);

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
	WeChatUser.remoteMethod('studentConfim',
		{
			accepts:[{arg:"studentId",type:"string"},
				{arg:"studentPw",type:"string"},
				{arg:"userId",type:"string"}],
			description:"学生学号密码验证",
			http: {path:"/student",verb: 'get'}
		});
	WeChatUser.remoteMethod('__create__histories',
		{
			accepts:[{arg:"data",type:"WeChatUserHistory"},
			{arg:"id",type:"string"}],
			http: {path:"/:id/histories",verb: 'post'}
		});
	WeChatUser.beforeRemote('__create__histories',function(ctx, unused, next){
			
		});
	//WeChatUser.disableRemoteMethod("__create__histories");
	WeChatUser.studentConfim = function(studentId,studentPw,userId,cb)
	{
		hduConfim.ihdu(studentId,studentPw,function(name){
			WeChatUser.findOne({where:{id:userId}},function(err,userInfo){
				var updatedAt = userInfo["updatedAt"];
				if(updatedAt === undefined)
					updatedAt = new Date().getTime();
				userInfo["studentId"]    = studentId;
				userInfo["university"]   = '杭州电子科技大学';
				userInfo["verifiedDate"] = updatedAt;
				userInfo["studentName"]  = name;
				userInfo["updatedAt"]  = new Date();
				var studentInfo = {
							"studentName":name,
			    			"studentId":studentId,
			    			"university":'杭电hytdfyhty',
			    			"verifiedDate":updatedAt,
			    			"updatedAt":new Date()
						};
				userInfo["weChatUserHistories"][userInfo["weChatUserHistories"].length]=studentInfo;
				console.log(userInfo);
				WeChatUser.update({id:userId},userInfo,
					function(err,count){
		    				if(err) cb(err);
							cb(userInfo);
		    		});
			});
		});
	}
	WeChatUser.beforeRemote("wechatLogin",function(ctx, unused, next){
		// WeChatUser.studentConfim('13055120','liu5120','55152aa5724fa5880dda8a0e',function(sm){
		// 	ctx.res.send(sm);
		// });
		// return;
		var referer = "http://www.baidu.com";
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
				QRcode.toDataURL(url,function(err,qrcode){
					ctx.res.render('./sign-in.ejs',{state:state,loginImg:qrcode});
				});
			}
		});
	});
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
	WeChatUser.beforeRemote("oauth",function(ctx, unused, next){
		var query = ctx.req.query;
		var state = query.state;
		WeChatUser.app.models.LoginCache.find({where:{randstate:query.state}},function(err,loginCache){
			if(err) 
				ctx.res.render("./student.ejs",{"msg":"出错了,请刷新后登陆"});
			else if(loginCache.length == 0)  
				ctx.res.render("./student.ejs",{"msg":"非法的请求"});
			else
			WeChatUser.app.models.LoginCache.updateAll(
				{randstate:state},
				{code:query.code},
				function(err,count){
					if(err)
						ctx.res.render("./student.ejs",{"msg":"出错了,请刷新后登陆"});
					else
						ctx.res.render("./student.ejs",{"msg":"success","state":state});
				});
		});
	});
};