var Q = require('q');
module.exports = function(OrganizationMenber) {
    OrganizationMenber.remoteMethod('getUserInfo', {
        accepts: {arg: 'id', type: 'string'},
        returns: {arg: 'info', type: 'object'},
        http: {verb: 'get', path: '/uinfo'}
    });
    OrganizationMenber.getUserInfo = function (id, cb) {

        cb(null, {name: "刘建东", studentId: 13055120, school: "杭州电子科技大学"});
    };
    OrganizationMenber.remoteMethod('getOwnerOrgMenbers', {
        accepts: {arg: 'id', type: 'string'},
        returns: {arg: 'info', type: 'object'},
        http: {verb: 'get', path: '/teaminfo'}
    });
    //id 微信用户ID
    OrganizationMenber.getOwnerOrgMenbers = function (id, cb) {
        OrganizationMenber.find(
            {
                where:
                    {
                        wechatUserId: id
                    },
                fields: {organizationUserId: true}
            }, function (err,instance) {
                var fns = [];
                if (err) {
                    cb(err);
                } else {
                    for (var i = 0; i < instance.length; i++) {
                        fns.push(getTeamMenbers (OrganizationMenber, instance[i].organizationUserId));
                    }
                    Q.all(fns)
                        .spread(function () {
                            var menbers = [];
                            for (var key in arguments) {
                                if (arguments[key]) {
                                    menbers.push(arguments[key]);
                                }
                            }
                            return menbers;
                        })
                        .done(function (menbers) {
                            cb(null, menbers);
                        }, function (err) {
                            cb(err);
                        });
                }

            }
        );
    };
    function getTeamMenbers (model, id) {
        var deferred = Q.defer();
        var team = {};
        model.app.models.OrganizationUser.findById(id, function (err, instance) {
            if (err) {
                deferred.reject(err);
            }
            team.id = instance.id;
            team.name = instance.name;
            model.find({where: {organizationUserId: id}}, function (err, data) {
                if (err) {
                    deferred.reject(err);
                } else {
                    team.menbers = data;
                    deferred.resolve(team);
                }
            });
        });

        return deferred.promise;
    }
};
