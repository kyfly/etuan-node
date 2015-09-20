var config = require('../../server/etuan');
var WechatAPI = require('wechat-api');
var api = new WechatAPI(config.wechat.appid, config.wechat.appsecret);
function templateMsg() {

}
templateMsg.prototype.activity = function (openid, url, data, cb) {
  var topcolor = '#FF0000';
  var templateId = config.wechatTplIds.activityId;
 api.sendTemplate(openid, templateId, url, topcolor, data, cb);
}
module.exports = templateMsg;
