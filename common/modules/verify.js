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
      cb(err, false); //找不到accessToken
    else
      tokenData.validate(function (err, isValid) {
        if (!isValid)
          cb(err, false); //accessToken已过期
        else
          userModel.findOne({where: {id: tokenData.userId}, fields: {studentId: true}},
            function (err, userData) {
              if (!userData)
                cb(err, false);   //找不到该用户
              else if (verifyRule == 'studentId') {
                if (userData.studentId)
                  cb(err, true, userData.studentId);  //学号验证时返回学号
                else
                  cb(err, false);   //学号未绑定
              }
              else
                cb(err, true);    //验证通过
            })
      })
  });
};

Verify.prototype.checkId = function (id) {
  return true;
};

Verify.prototype.getStudentId = function (token, cb) {
  tokenModel.findOne({where: {id: token}, fields: {userId: true}}, function (err, tokenData) {
    userModel.findOne({where: {id: tokenData.userId}, fields: {studentId: true}},
      function (err, userData) {
        cb(userData.studentId);
      });
  })
};
