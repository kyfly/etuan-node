module.exports = function(WeChatUserHistory) {
  //保存更新时间
  WeChatUserHistory.observe('before save', function(ctx, next) {
    if(ctx.instance) {
      ctx.instance.updatedAt = new Date();
    }
    else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });	
};
