module.exports = function(BaseItem) {
	BaseItem.observe('before save', function(ctx, next) {
    if(ctx.instance) {
      ctx.instance.updatedAt = new Date();
    }
    else {
      ctx.data.updatedAt = new Date();
    }
    next();
	});
};
