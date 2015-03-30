var OAuth = require('wechat-oauth');
var config = require('../../server/config');
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
			returns:{arg:"url",type:"string"},
			http: {path:"/wechatLogin",verb: 'get'}
		});
	WeChatUser.remoteMethod("confirm",
		{
			accepts:[{arg:'code',type:'string'},
				{arg:'state',type:'string'}],
			http: {path:"/oauth",verb: 'get'}
		});
	WeChatUser.remoteMethod('studentConfim',
		{
			accepts:[{arg:'studentId',type:'string'},
				{arg:'studentPw',type:'string'}],
			http: {path:"/student",verb: 'get'}
		});
	WeChatUser.studentConfim = function(studentId,studentPw,cb)
	{
		hduConfim.ihdu(data.stuId,data.stuPwd,
			function(name){
	    		WeChatUser.upsert({
	    			"name":name,
	    			"stuId":data.stuId,
	    			"stuPwd":data.stuPwd
	    		},function(){
	    			console.log("ok");
	    			cb(null,name);
	    		});
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
			ctx.res.send({state:state,url:url});
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
					ctx.res.send({"msg":"授权成功,等待获取微信信息","state":query.state});
				});
		});
	});

  //微信用户投票之前，检查最大投票数，验证规则，是否已经投票
  WeChatUser.beforeRemote('__count__voteResults', function(ctx, instance, next) {
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
  WeChatUser.beforeRemote('__count__voteResults', function(ctx, instance, next) {
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
};











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
