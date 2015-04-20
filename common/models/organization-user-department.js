module.exports = function(OrganizationUserDepartment) {
  //保存更新时间
  OrganizationUserDepartment.observe('before save', function(ctx, next) {
    if(ctx.instance) {
      ctx.instance.updatedAt = new Date();
    }
    else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });
};
