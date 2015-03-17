var config = require('../../server/config');
var weixin = require('../modules/weixin.js');
var crypto = require('crypto');

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
function sinceQR(WeChatMP,sinceId,cb)
{
	WeChatMP.app.models.WeChatEtuanQR.findOne({qrNumber:sinceId},function(err,sinceQr){
		if(err) cb(null);
		if(sinceQr.length > 0)
		switch(sinceQr.itemType){
			case 'form':WeChatMP.app.models.Form.findOne({where:{id:sinceQr.itemId}},cb);break;
			case 'vote':WeChatMP.app.models.Vote.findOne({where:{id:sinceQr.itemId}},cb);break;
		}
	});
}
function reply(req,res,WeChatMP){
	// console.log(req.query.user);
	// WeChatMP.find({where:{interfaceUrl:req.query.user}},function(err,result){

	// });
	if(req.query.encrypt_type === 'aes'){
		var encrypt_type = 'aes';
	}
	else
		var encrypt_type = 'raw';
	var wechat = new weixin({
		token:'332',
		encodingAESKey:config.encodingAESKey,
		appid:config.appid
	},encrypt_type);
	wechat.getMessage(req,function(reqJson){
		var toUser = reqJson.ToUserName[0];
	 	var keyword = reqJson.Content;
	 	var reqMsg;
	 	
	 	switch(reqJson.MsgType){
			case 'event':
			switch(reqJson.Event){
				case "subscribe":
					if(reqJson.EventKey === undefined){
						wechat.reply({},reqJson,function(err,xml){
							res.send(xml);
						});
					}else{
						sinceQR(WeChatMP,reqJson.EventKey.substr(8),
							function(err,reqMsg){
								if(err) reqMsg = {};
								wechat.reply(reqMsg,reqJson,function(err,xml){
									res.send(xml);
								});
							});
					}
					break;
				case "SCAN": 
					sinceQR(WeChatMP,reqJson.EventKey,
							function(err,reqMsg){
								if(err) reqMsg = {};
								wechat.reply(reqMsg,reqJson,function(err,xml){
									res.send(xml);
								});
							});
					break;
				case "CLICK":
					var clickMenu = reqJson.EventKey;
					break;
				case "VIEW":
					var url = reqJson.EventKey;
					break;
			}
			default:
			WeChatMP.findOne({
		        where: {mpOriginId: toUser, 'weChatMPAutoReplies.keyword': keyword},
		        fields: {"weChatMPAutoReplies": true}
		    },
		    function (err, result) {
		        var reply = result.weChatMPAutoReplies[0];
		        if (reply.type === "text")
		          var reqMsg = {"type": "text", "content": reply.text};
		        else
		          var reqMsg = {"type": "news", "content": reply.news};
		      	wechat.reply(reqMsg,reqJson,function(err,xml){
					res.send(xml);
				});
		    })
		}
	});
}

module.exports = function(WeChatMP) {
	WeChatMP.remoteMethod("wechat",{
		accepts:{arg:'data',type:"string"},
		http: {path: '/wechat', verb: 'get'}
	});
	WeChatMP.remoteMethod("wechat",{
		accepts:{arg:'data',type:"string"},
		http: {path: '/wechat', verb: 'post'}
	});
	WeChatMP.remoteMethod("init",{
		accepts:[
			{arg:'uid',type:"string"},
			{arg:'mporiginid',type:"string"},
			{arg:'appid',type:"string"},
			{arg:'appsecret',type:"string"},
			{arg:'reset',type:"string"}
		],
		returns:{arg:'userApiinfo',type:"object"},
		http: {path: '/init', verb: 'get'}
	});
	WeChatMP.init = function(uid,mporginid,appid,appsecret,reset,cb){
		if(reset === undefined)
		{	
			WeChatMP.find({where:{mpOriginId:mporginid}},function(err,result){
				if(result.length > 0){
					cb(result);
				}
				var key = {
					organizationUid:uid,
					interfaceUrl: '/api/WeChatMPs/wechat?user='+mporginid,
			  		interfaceToken: __randomString(40),
			  		interfaceKey: __randomString(43),
			  		mpOriginId:mporginid,
			  		appId:appid,
			  		appSecret:appsecret,
			  		updatedAt:new Date().getTime()
				};
				WeChatMP.create(key,function(err,result){
					cb(result);
				});
			});
		}else{
			var key = {
				interfaceToken: __randomString(40),
			  	interfaceKey: __randomString(43),
			  	appSecret:appsecret,
			  	updatedAt:new Date().getTime()
			};
			WeChatMP.updateAll({where:{mpOriginId:mporginid}},key,function(err,count){
				WeChatMP.find({where:{mpOriginId:mporginid}},function(err,result){
					cb(result);
				});
			});
		}
	}
	
	WeChatMP.beforeRemote("wechat",function(ctx, unused, next){
		var req = ctx.req;
		var res = ctx.res;
		if(req.method === 'POST'){
			reply(req,res,WeChatMP);
		}else{
			var query = req.query;
			var signature = query.signature;
			var timestamp = query.timestamp;
			var echostr = query.echostr;
			var nonce = query.nonce;
			var shasum = crypto.createHash('sha1');
			var token = '332';
			var arr = [token, timestamp, nonce].sort();
			shasum.update(arr.join(''));

			//if(shasum.digest('hex')===signature)
			//{
			 	res.send(echostr);
			//}//else{
			//	res.send(null);
			//}
		}
	});
};
