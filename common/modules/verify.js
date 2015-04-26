module.exports = Verify;

var tokenModel;
var userModel;
var verifyRule;
var verifyIdRex = {
  "phone": "",
  "idCard": ""
};

function Verify(token, user, rule) {
  tokenModel = token;
  userModel = user;
  verifyRule = rule;
}

Verify.prototype.rule = verifyRule;

Verify.prototype.idMask = function (verifyId) {
  if (typeof(verifyId) != 'string')
    verifyId += '';
  return verifyId.slice(0, 2) + '***' + verifyId.slice(5, verifyId.length);
};

Verify.prototype.checkToken = function (token, cb) {
  tokenModel.findOne({where: {id: token}}, function (err, tokenData) {
    if (!tokenData)
      cb(err, false);
    else
      tokenData.validate(function (err, isValid) {
        if (!isValid)
          cb(err, false);
        else
          userModel.findOne({where: {id: tokenData.userId}}, function (err, userData) {
            if (!userData)
              cb(err, false);
            else
              if (verifyRule == 'studentId')
                cb(err, true, userData.studentId);
              else
                cb(err, true);
          })
      })
  });
};

Verify.prototype.getStudentId = function (token, cb) {
  tokenModel.findOne({where: {id: token}, fields: {userId: true}}, function (err, tokenData) {
    userModel.findOne({where: {id: tokenData.userId}, fields: {studentId: true}},
      function (err, userData) {
        cb(userData.studentId);
      });
  })
};
