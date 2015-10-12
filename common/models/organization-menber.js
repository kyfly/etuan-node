module.exports = function(OrganizationMenber) {
    OrganizationMenber.remoteMethod('getUserInfo', {
        accepts: {arg: 'id', type: 'string'},
        returns: {arg: 'info', type: 'object'},
        http: {verb: 'get', path: '/uinfo'}
    });
    OrganizationMenber.getUserInfo = function (id, cb) {

        cb(null, {name: "刘建东", studentId: 13055120, school: "杭州电子科技大学"});
    };
};
