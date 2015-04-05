var xml2js = require('xml2js');
var crypto = require('crypto');
var WXAPI = require('wechat-api');
var config = require('../../server/config');
var WXBizMsgCrypt = require('wechat-crypto');
var api = new WXAPI(config.appid, config.appsecret);

function weixin(options,encrypt_type,cb){
	this.options = options;
	this.encrypt_type = encrypt_type;
	this.crypto = new WXBizMsgCrypt(this.options.token,
		this.options.encodingAESKey,
		this.options.appid
	);
}
weixin.prototype.isSubscribe = function(openid,cb){
	api.getUser(openid,function(err,res){
		if(err) cb(err);
		else if(res.subscribe === 1) cb(null,true);
		else cb(null,false);
	})
}
weixin.prototype.getMessage = function (req, cb) {
	var encrypt_type = this.encrypt_type;
	var crypto = this.crypto;
	var buffers = [];
	req.on('data', function (trunk) {
	    buffers.push(trunk);
	});
	req.on('end', function () {
	  	var xml = Buffer.concat(buffers).toString('utf-8');
    	xml2js.parseString(xml, {trim: true}, function (err, reqJson){
			if(!err){
				if(encrypt_type === 'aes'){
					var xml = crypto.decrypt(reqJson.xml.Encrypt[0]).message;
					xml2js.parseString(xml, {trim: true}, function (err, reqJson){
						cb(reqJson.xml);
					});
				}else
					cb(reqJson.xml);
			}
		});
	});
};
weixin.prototype.checkSignature = function (query,cb) {
	var signature = query.signature;
	var timestamp = query.timestamp;
	var echostr = query.echostr;
	var nonce = query.nonce;
	var shasum = crypto.createHash('sha1');
	var arr = [this.token, timestamp, nonce].sort();
	shasum.update(arr.join(''));
	if(shasum.digest('hex') === signature)
	{
	 	cb(null,echostr);
	}else{
		cb("faild");
	}
};


weixin.prototype.xmlTemplate = function(resJson)
{

	var xml = '<xml><ToUserName><![CDATA['+resJson.ToUserName+']]></ToUserName><FromUserName><![CDATA['+
	resJson.FromUserName+']]></FromUserName><CreateTime>'+new Date().getTime()+'</CreateTime><MsgType><![CDATA['+resJson.MsgType+']]></MsgType>';
	switch(resJson.MsgType){
		case 'text':
			xml += '<Content><![CDATA['+resJson.Content+']]></Content>'
			break;
		case 'image':
			xml += '<Image><MediaId><![CDATA['+resJson.Content+']]></MediaId></Image>';
			break;
		case 'news':
			xml += '<ArticleCount>'+resJson.Content.length+'</ArticleCount><Articles>';
			for(var item in resJson.Content)
			{
				xml += '<item><Title><![CDATA['+item.Title+']]></Title><Description><![CDATA['+
				item.Description+']]></Description><PicUrl><![CDATA['+item.PicUrl+']]></PicUrl><Url><![CDATA['+item.Url+']]></Url></item>';
			}
			xml += '</Articles>'
			break;
		//case 'text':break;
	}
	xml += '</xml>';
	return xml;
}
weixin.prototype.aesTemplate = function(msg_encrypt){
	var timestamp = new Date().getTime(), nonce = 56456;
	msg_signature = this.crypto.getSignature(timestamp,nonce,'aes');
	return '<xml><Encrypt><![CDATA['+msg_encrypt+']]></Encrypt><MsgSignature><![CDATA['+msg_signature+']]></MsgSignature><TimeStamp>'+timestamp+'</TimeStamp><Nonce><![CDATA['+nonce+']]></Nonce></xml> ';
}
weixin.prototype.reply = function(resMsg,reqJson,cb)
{
	if(resMsg.Type === 'undefine')
		return cb("未定义消息类型");
	var reqObj = reqJson;
	var temJson = {};
	temJson.ToUserName   = reqObj.FromUserName[0];
	temJson.FromUserName = reqObj.ToUserName[0];
	temJson.CreateTime   = new Date().getTime();
	temJson.MsgType      = resMsg.type;
	temJson.Content      = resMsg.content;

	var xml = this.xmlTemplate(temJson);
	if(this.encrypt_type === 'aes'){
		var msg_encrypt = this.crypto.encrypt(xml);
		xml = this.aesTemplate(msg_encrypt);
	}
	
	cb(null,xml);
}
weixin.prototype.test = function(reqxml,cb)
{
	this.crypto = new WXBizMsgCrypt(this.options.token,this.options.encodingAESKey,this.options.appid);
	var msg_encrypt = this.crypto.encrypt(reqxml);
	var xml = this.aesTemplate(msg_encrypt);
	cb(msg_encrypt);
}
module.exports = weixin;
