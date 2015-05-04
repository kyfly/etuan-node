module.exports = Verify;

var tokenModel;
var userModel;
var verifyRule = '';
var verifyIdRegular = {
  "phone": /^1[3-8]\d{9}$/,
  "idCard": /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
};

/**
 * 构造函数，初始化Verify
 * @example new Verify(app.models.AccessToken, app.models.WeChatUser, 'studentId');
 * @param {Object} token AccessToken模型
 * @param {Object} user 用户信息所在模型
 * @param {String} rule 验证规则
 * @constructor
 */

function Verify(token, user, rule) {
  tokenModel = token;
  userModel = user;
  verifyRule = rule;
}

/**
 * @return 当前验证的类型
 * @type {string}
 */

Verify.prototype.rule = verifyRule;

/**
 * 对用户的验证id打上星号(*)，保护隐私
 * @param {String} verifyId 验证id
 * @returns {String} 加星号以后的验证id
 */

Verify.prototype.idMask = function (verifyId) {
  if (typeof(verifyId) != 'string')
    verifyId += '';
  return verifyId.slice(0, 2) + '***' + verifyId.slice(5, verifyId.length);
};

/**
 * 检查一个accessToken是否有效
 * @param {String} token accessToken的内容
 * @param {Function} cb 回调函数，返回是否有效`cb(err, true|false)`
 */

Verify.prototype.checkToken = function (token, cb) {
  if (!tokenData)  cb(null, false);
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

/**
 * 检查一个验证id是否合法
 * 注：如果验证方式是学号，则直接返回true，请使用教务系统验证
 * @param {String} id 验证id
 * @returns {Boolean} 返回是否合法
 */

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

/**
 * 通过accessToken获得学生学号
 * @param {String} token accessToken的内容
 * @param {Function} cb 回调函数，返回学号`cb(err, studentId)`
 */

Verify.prototype.getStudentId = function (token, cb) {
  if (!token)  cb("token can't be null");
  tokenModel.findOne({where: {id: token}, fields: {userId: true}}, function (err, tokenData) {
    userModel.findOne({where: {id: tokenData.userId}, fields: {studentId: true}},
      function (err, userData) {
        cb(err, userData.studentId);
      });
  })
};

/**
 * 通过accessToken获取用户id
 * @param {String} token accessToken的内容
 * @param {Function} cb 回调函数，返回结果`cb(err, userId)`
 */

Verify.prototype.getUserId = function (token, cb) {
  if (!token)  cb("token can't be null");
  tokenModel.findOne({where: {id: token}}, function (err, tokenData) {
    cb(err, tokenData.userId)
  })
};
