var config = require('../../server/config');
var WXAPI = require('wechat-api');
var api = new WXAPI(config.appid, config.appsecret);

function QrcodeUrl(since,type,cb){
	if(type === 'tem')
		api.createTmpQRCode(since,1800,function(err,result){
			if(!err)
				cb(api.showQRCodeURL(result.ticket));
		});
	else
		api.createLimitQRCode(since,function(err,result){
			if(!err)
				cb(api.showQRCodeURL(result.ticket));
		});
}

module.exports = function(WeChatEtuanQR) {
	WeChatEtuanQR.getSinceCode = function(itemType,itemId,cb){
		WeChatEtuanQR.find(
			{
				where:{
				and:[
					{itemType:itemType},
					{itemId:itemId}
				]}
			},function(err,result){
				if(!err) 
						console.log(result.length);				
					if(result.length < 1) {
						WeChatEtuanQR.__createSince(itemType,itemId,function(result){
							cb(result);
						});
						//WeChatEtuanQR.getSinceCode(itemType,itemId,cb);
					}else{
						cb(result);
					}
			});
	}
	WeChatEtuanQR.distroySince = function(itemType,itemId){
		WeChatEtuanQR.updateAll(
			{
				where:{
				and:[
					{itemType:itemType},
					{itemId:itemId}
				]}
			},{
				itemType:null,
				itemId:null,
				QrcodeUrl:null,
				isDeleted:1
			},function(err,count){});
	}
	WeChatEtuanQR.__createSince = function(itemType,itemId,cb){
		WeChatEtuanQR.findOne({
			where:{or:[{isDeleted:1},{isDeleted:0}]},
			fields:['qrNumber'],
			order:"qrNumber DESC",
			limit:1
		},function(err,result){
			if(!err)
			{
				if(result === null)
				{
					nextNumber = 1;
					result = {};
					result.isDeleted = 0;
				}
				else{
					nextNumber = result.qrNumber + 1;
				}
				var url = QrcodeUrl(nextNumber,'',function(url){
				if(result.isDeleted === 1)
					WeChatEtuanQR.updateAll({where:{qrNumber:result.qrNumber}},{
						itemType:itemType,
						itemId:itemId,
						qrNumber:result.qrNumber,
						QrcodeUrl:url,
						isDeleted:0
					},function(err,count){
						cb({
							itemType:itemType,
							itemId:itemId,
							qrNumber:result.qrNumber,
							QrcodeUrl:url,
							isDeleted:0
						});
					});
				else
					WeChatEtuanQR.create({
						itemType:itemType,
						itemId:itemId,
						qrNumber:nextNumber,
						QrcodeUrl:url,
						isDeleted:0
					},function(err,result){
						cb(result);
					});
				})
				console.log(result);
			}
		});
	}
};
