var OAuth = require('wechat-oauth');
var config = require('../../server/config');
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
				ctx.res.render('./sign-in.ejs',{state:state,qrcodeUrl:url});
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

  //微信用户投票之前，检查最大投票数，验证规则，是否已经投票
  WeChatUser.beforeRemote('__create__voteResults', function(ctx, instance, next) {
    var Vote = WeChatUser.app.models.Vote;
    var VoteResult = WeChatUser.app.models.VoteResult;
    VoteResult.findOne({ where: { voteId: instance.voteId, weChatUid: instance.weChatUid }}, function(err, voteResult) {
    	if(voteResult === null) {
    		Vote.findOne({ where: { id: instance.voteId }}, function(err, vote) {
					if(instance.results.length > vote.maxVote) {
	    			if(vote.verifyRule === 'studentId') {
							WeChatUser.findOne({ where: { id: instance.weChatUid }}, function(err, weChatUser) {
			    			if(weChatUser.studentId != null) {
			    				next();
			    			}
			    			else {
			    				ctx.res.end('需要绑定');
			    			}
	    				});
	    			}
	    			else {
	    				next();
	    			}
	    		}
	    		else {
	    			ctx.res.end('超过最大投票数');
	    		}
    		});
    	}
    	else {
    		ctx.res.end('已经透过票了');
    	}
    });
  });

  //微信用户报名之前，，验证规则，是否已经报名
  WeChatUser.beforeRemote('__create__formResults', function(ctx, instance, next) {
    var Form = WeChatUser.app.models.Form;
    var FormResult = WeChatUser.app.models.FormResult;
    FormResult.findOne({ where: { formId: instance.formId, weChatUid: instance.weChatUid }}, function(err, formResult) {
    	if(formResult === null) {
    		Form.findOne({ where: { id: instance.formId }}, function(err, form) {
    			if(form.verifyRule === 'studentId') {
						WeChatUser.findOne({ where: { id: instance.weChatUid }}, function(err, weChatUser) {
		    			if(weChatUser.studentId != null) {
		    				next();
		    			}
		    			else {
		    				ctx.res.end('需要绑定');
		    			}
    				});
    			}
    			else {
    				next();
    			}
    		});
    	}
    	else {
    		ctx.res.end('已经报过名了');
    	}
    });
  });












//  {
//     "organizationUid": "ghfhghgfh",
//     "mpOriginId": "gh_f53d79a",
//     "interfaceUrl": "/api/WeChatMPs/wechat?user=gh_f53d79a8e7ce",
//     "interfaceToken": "68Ac9CXgud7xc7jaSEU21PSEch8qyUJZtsivcZ4J",
//     "appId": "wx5d92b3c192f993e7",
//     "appSecret": "d5d284eb92f6d96554aeb92d679640e7",
//     "updatedAt": "2015-03-07T04:52:42.749Z",
//     "interfaceKey": "WoZHDU8JD6C5khyCjLs3nwtoPLgkU75rKlFYcCKz1k5",
//     "id": "jkhk",
//     "weChatMPAutoReplies": [
//       {
//         "type": "news",
//         "keyword": [
//           "xddf",
//           "df"
//         ],
//          "news":
// 		    [{
// 		    		      "order": 0,
// 		    		      "title": "tdgdg",
// 		    		      "description": "fdgfdg",
// 		    		      "cover": "ff",
// 		    		      "url": "fff",
// 		    		      "id": "objectid"
// 		    		    }],
//         "updatedAt": "2015-03-07T04:52:42.749Z",
//         "id": 3
//       }
//     ]
// }

};

