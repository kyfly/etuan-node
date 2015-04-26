module.exports = Verify;

var tokenModel;
var userModel;
var verifyRule = '';
var verifyIdRegular = {
  "phone": /^1[3-8]\d{9}$/,
  "idCard": /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
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
  if (verifyRule == 'studentId')
    return true;
  if (verifyIdRegular.hasOwnProperty(verifyRule)) {
    var reg = new RegExp(verifyIdRegular[verifyRule]);
    return reg.test(id);
  }
  else
    return false;
};

Verify.prototype.getStudentId = function (token, cb) {
  tokenModel.findOne({where: {id: token}, fields: {userId: true}}, function (err, tokenData) {
    userModel.findOne({where: {id: tokenData.userId}, fields: {studentId: true}},
      function (err, userData) {
        cb(userData.studentId);
      });
  })
};

Verify.prototype.getUserId = function (token, cb) {
  tokenModel.findOne({where: {id: token}}, function (err, tokenData) {
    cb(err, tokenData.userId)
  })
};
