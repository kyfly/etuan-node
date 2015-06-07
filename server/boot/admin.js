module.exports = function(app) {
  var User = app.models.OrganizationUser;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  function createAdmin (userId) {
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: userId
      }, function(err, principal) {
        if (err) throw err;
      });
    });
  }

  User.findOne(
    {where:{email: 'admin@etuan.org'}}
  , function(err, user) {
    if (err) throw err;
    if (!user) {
      User.create({"email":"admin@etuan.org","password":"www.etuan.org"}, function (err, newUser) {
        createAdmin(newUser.id);
      });
    } else {
      createAdmin(user.id);
    }
  });
};
//"email":"admin@etuan.org","password":"www.etuan.org"