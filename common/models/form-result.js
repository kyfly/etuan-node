module.exports = function(FormResult) {

	//form-result检查１．微信绑定 ２．已经报名
	FormResult.observe('before save', function(ctx, next) {
		var Form = FormResult.app.models.Form;
		var WeChatUser = FormResult.app.models.WeChatUser;
		FormResult.findOne({ where: { formId: ctx.instance.formId, weChatUid: ctx.instance.weChatUid }}, function(err, formResult) {
			if(formResult === null) {
				Form.findOne({ where: { id: ctx.instance.formId }}, function(err, form) {  			
					switch(form.verifyRule) {
						case 'studentId':
							WeChatUser.findOne({ where: { id: ctx.instance.weChatUid }}, function(err, weChatUser) {
								if(weChatUser.studentId != null) {
									next();
								}
								else {
									next({'status': '400', 'content': '需要绑定微信'});
								}
							});    		
								break;
						default:
							next();
							break;
					}
				});
			}
			else {
				next({'status': '400', 'content': '已经报过名了'});
			}
		});		
	});
};
