module.exports = function(FormResult) {
	//form-result检查１．微信绑定 ２．已经报名 3.开始时间结束时间
	FormResult.observe('before save', function(ctx, next) {
		var Form = FormResult.app.models.Form;
		var WeChatUser = FormResult.app.models.WeChatUser;
        if (ctx.data){
			ctx.data = ctx.data.data;
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
