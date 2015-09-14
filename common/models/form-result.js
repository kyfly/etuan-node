var tplMsg = require('../modules/templateMsg');
var TplMsg = new tplMsg();
module.exports = function(FormResult) {

  function sendMsg(Instance, messageData) {
    Instance.form(function(err, Finstance) {
      if (err) {
        return;

      }
      FormResult.app.models.WeChatUser.findById( Instance.weChatUid, function (err, ins) {
        if (err) {
          return;
        }

        var data = {
          first: {
            value: Finstance.organizationName + "发来通知"
          },
          HandleType: {
            value: "报名结果通知"
          },
          Status: {
            value: "成功"
          },
          RowCreateDate: {
            value: new Date().toLocaleDateString()
          },
          LogType: {
            value: "非常感谢你参与【"+ Finstance.organizationName +"】举办的报名活动 【" +Finstance.title+"】 特发来通知：" + messageData.message
          },
          remark: {
            value: "此消息来自团团一家，点击【详情】可回复信息"
          }
        }
        var url = 'www.etuan.org/form/re.html#?msgId=' + messageData.messageId + '&resultId='+ Instance.id +"&type=form";
        TplMsg.activity(ins.openid, url, data,  function(){})
      });
    });
  }
  //form-result检查１．微信绑定 ２．已经报名 3.开始时间结束时间
	FormResult.observe('before save', function(ctx, next) {
		var Form = FormResult.app.models.Form;
		var WeChatUser = FormResult.app.models.WeChatUser;
    if (ctx.data){
			ctx.data = ctx.data;
      if (ctx.data.$push && ctx.data.$push.messages) {
        sendMsg(ctx.currentInstance, ctx.data.$push.messages);
      }
			next();
			return;
		}
		FormResult.findOne({ where: { formId: ctx.instance.formId, weChatUid: ctx.instance.weChatUid }}, function(err, formResult) {
			if(formResult === null) {
				Form.findOne({ where: { id: ctx.instance.formId }}, function(err, form) {
					if(form.startTime <= new Date() && form.stopTime >= new Date()) {
						switch(form.verifyRule) {
							case 'studentId':
								WeChatUser.findOne({ where: { id: ctx.instance.weChatUid }}, function(err, weChatUser) {
									if(weChatUser.studentId != null) {
										next();
									}
									else {
										next({'status': '400', 'message': '需要绑定学号'});
									}
								});
									break;
							default:
								next();
								break;
						}
					}
					else {
						next({'status': '400', 'message': form.startTime > new Date()?'还未开始': '已经结束'});
					}

				});
			}
			else {
				next({'status': '400', 'message': '已经报过名了'});
			}
		});
	});
};
