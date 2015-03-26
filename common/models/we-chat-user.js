var OAuth = require('wechat-oauth');
var config = require('../../server/config');
var QRcode = require('qrcode');
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
	WeChatUser.remoteMethod("confirm",
		{
			accepts:[{arg:'code',type:'string'},
				{arg:'state',type:'string'}],
			http: {path:"/oauth",verb: 'get'}
		});
	
	WeChatUser.remoteMethod('studentConfim',
		{
			accepts:[{arg:"studentId",type:"string"},
				{arg:"studentPw",type:"string"},
				{arg:"userId",type:"string"}],
			description:"学生学号密码验证",
			http: {path:"/student",verb: 'get'}
		});
	
	WeChatUser.studentConfim = function(studentId,studentPw,userId,cb)
	{
		hduConfim.ihdu(studentId,studentPw,function(name){
    	// 	WeChatUser.findOne({id:userId},function(err,wechatUserInfo){
    	// 		if(err)
    	// 			cb(err);
    	// 		else if(wechatUserInfo.email === undefined)
    	// 			cb({err:{msg:"非法的请求"}});
    	// 		else
    	// 			console.log(wechatUserInfo);return
    	// 			wechatUserInfo = wechatUserInfo.__data;
					// // if(wechatUserInfo["weChatUserHistories"].length === 0)
					// // 	wechatUserInfo.__data["weChatUserHistories"] = [];
					// // else
					// // 	wechatUserInfo["weChatUserHistories"] = wechatUserInfo.__data["weChatUserHistories"][0].__data;

					// var updatedAt = wechatUserInfo["updatedAt"];
					// if(updatedAt === undefined)
					// 	updatedAt = new Date().getTime();
					
    	// 			var studentInfo = {
					// 	"studentName":name,
		   //  			"studentId":studentId,
		   //  			"university":'杭州电技大学',
		   //  			"verifiedDate":updatedAt,
		   //  			"updatedAt":new Date().getTime()
					// };
					// wechatUserInfo["studentId"]    = studentId;
					// wechatUserInfo["university"]   = '杭州电子科技大学';
					// wechatUserInfo["verifiedDate"] = updatedAt;
					// wechatUserInfo["studentName"]  = name;
					// wechatUserInfo["updatedAt"]  = new Date().getTime();
    	// 			wechatUserInfo["weChatUserHistories"].push(studentInfo);
    			
    	// 			//cb(wechatUserInfo.weChatUserHistories);return;
	    // 			WeChatUser.update({id:userId},wechatUserInfo,function(err,count){
	    // 				if(err) cb(err);
	    // 				cb(count);
	    // 			});
    	// 	});
    	});
	}
	WeChatUser.beforeRemote("wechatLogin",function(ctx, unused, next){
		
		var state = __randomString(40)+ new Date().getTime().toString();
		var loginCacheObj = {
			createAt:new Date().getTime(),
			state:state,
			isConfirm:0,
			code:0
		};
		WeChatUser.app.models.LoginCache.create(loginCacheObj,function(err,result){
			if(err)
				ctx.res.send(err);
			var url = client.getAuthorizeURL('http://'+ctx.req.host+':80/api/WeChatUsers/oauth', state, 'snsapi_login');
			QRcode.toDataURL(url,function(err,qrcode){
				ctx.res.render('./sign-in.ejs',{state:state,loginImg:qrcode});
			});
		});
	});
	WeChatUser.beforeRemote("confirm",function(ctx, unused, next){
		var referer = ctx.req.headers.referer;
		var query = ctx.req.query;

		WeChatUser.app.models.LoginCache.find({where:{state:query.state}},function(err,loginCache){
			if(err) ctx.res.send(err);
			if(loginCache.length == 0)  ctx.res.send({"msg":"非法的请求"});

			WeChatUser.app.models.LoginCache.updateAll(
				{where:{state:query.state}},
				{code:query.code},
				function(err,count){
					if(err)
						ctx.res.send(err);
					ctx.res.redirect("/oauth.html?state="+query.state);
				});
		});
	});
};








