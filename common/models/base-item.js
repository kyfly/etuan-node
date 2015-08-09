module.exports = function(BaseItem) {
	BaseItem.observe('before save', function(ctx, next) {
		if(ctx.instance) {
			ctx.instance.updatedAt = new Date();
		}
		else {
			ctx.data.updatedAt = new Date();
		}
		var loopback = require('loopback');
	        var context = loopback.getCurrentContext();
	        var currentUser = context && context.get('currentUser');
	        if(currentUser && currentUser.university && currentUser.school && currentUser.type) {
			ctx.instance.university = currentUser.university;
			ctx.instance.type = currentUser.type;
			ctx.instance.school = currentUser.school;
	        }
		next();
	});
};
