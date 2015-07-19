var config = require('../../server/config');
var wechatOauth = require('wechat-oauth');
var hduConfim = require('../modules/hdu-student.js');
var client = new wechatOauth(config.wechat.appid, config.wechat.appsecret);
function __randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJoOLl9gqVvUuI1KMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
module.exports = function (WeChatUser) {
  WeChatUser.remoteMethod("formPC",
    {
      returns: {arg: "data", type: "object"},
      description: "获取微信登录链接,返回{state:state,url:url}",
      http: {path: "/formPC", verb: 'get'}
    });
  WeChatUser.remoteMethod('fromWechat',
    {
      http: {path: '/fromWechat', verb: 'get'}
    });
  WeChatUser.remoteMethod("oauth",
    {
      accepts: [{arg: 'code', type: 'string'},
        {arg: 'state', type: 'string'}],
      http: {path: "/oauth", verb: 'get'}
    });
  WeChatUser.remoteMethod("phoneoauth",
    {
      accepts: [{arg: 'code', type: 'string'},
        {arg: 'state', type: 'string'}],
      http: {path: "/phoneoauth", verb: 'get'}
    });
  WeChatUser.remoteMethod('confirm',
    {
      accepts: {arg: 'state', type: 'string'},
      description: "微信登录验证,手机,PC端都用这个接口验证",
      http: {path: "/confirm", verb: 'get'}
    });
  WeChatUser.beforeRemote('confirm', function (ctx, unused, next) {
    return WeChatUser.app.models.LoginCache.confirm(ctx, unused, next);
  });
  function getTicket (cb) {
    var ticket = __randomString(30) + new Date().getTime().toString();
    var loginCacheObj = {
      createAt: new Date(),
      ticket: ticket,
      isConfirm: 0,
      userId:null
    };
    WeChatUser.app.models.LoginCache.create(loginCacheObj, function (err, result) {
      cb(err, ticket);
    });
  }
  /**
   * 微信用户获取oauth2.0链接接口
   * method get
   * @param  {[type]} ctx          [description]
   * @param  {[type]} unused       [description]
   * @param  {String} next){		var referer       [description]
   * @return {[type]}              [description]
   */
  WeChatUser.beforeRemote("formPC", function (ctx, unused, next) {
    getTicket(function (err, ticket) {
      var url = client.getAuthorizeURL('http://beta.etuan.org/api/WeChatUsers/oauth', ticket, 'snsapi_userinfo');
      ctx.res.send({state: ticket, qrcodeUrl: url});
    });
  });
  /**
   * 微信客户端Auth2.0验证
   * @param  {[type]} ctx      [description]
   * @param  {[type]} unused   [description]
   * @param  {[type]} next)    {                       var url [description]
   * @param  {[type]} function (err,         token){                             console.log(cache.referer);          ctx.res.render("phone-login.ejs", {"msg": "success", "url": cache.referer, "userInfo": user, "token": token});        } [description]
   * @return {[type]}          [description]
   */
  WeChatUser.beforeRemote('fromWechat', function (ctx, unused, next) {
    getTicket(function (err, ticket) {
      var url = client.getAuthorizeURL('http://beta.etuan.org/api/WeChatUsers/phoneoauth', ticket, 'snsapi_userinfo');
      ctx.res.redirect(url);
    });
  });
  /**
   * 手机微信用户oauth2.0登录接口
   * url /api/WeChatUsers/phoneoauth?code=CODE
   * get code=CODE
   * @param  {[type]} code 从微信服务器返回
   * @return 登录前请求页面
   */
  WeChatUser.beforeRemote("phoneoauth", function (ctx, unused, next) {
    var code = ctx.req.query.code;
//return ctx.res,render("phone-login.ejs",{"a":"b"});
console.log(ctx.req.query);
    getWechatInfoByCode(code, function (err, wechatUserInfo) {
      if (err || !wechatUserInfo) 
        return ctx.res.render("phone-login.ejs", {'status': "fail", 'msg': "获取微信信息失败", "token":{}});
      else
        createWechatUser(wechatUserInfo, function (err, user) {
          if (err)
            return ctx.res.render("phone-login.ejs", {'status': "fail", 'msg': err, "token":{}});
          else
          {
            wechatLogin(user.openid, function (err, token) {
              if (err)
                return ctx.res.render("phone-login.ejs", {'status': "fail", 'msg': "登录失败", "token":{}});
              else 
                return ctx.res.render("phone-login.ejs", {'status': "success", 'token': token});
            });
          }
        });
    });
  });
  function wechatUserIsInDB (openid, cb) {
    WeChatUser.findOne({where:{openid: openid}}, cb);
  }
  function getWechatInfoByCode (code, cb) {
    client.getUserByCode(code, function (err, user) {
      if (err) 
        cb(err);
      else
      {
        user.email = user.openid + "@etuan.org";
        user.password = user.openid;
        cb(null, user);
      }
    });
  }

  function createWechatUser (user, cb) {
    wechatUserIsInDB(user.openid, function (err, oldUser) {
if (err) 
        cb("服务器错误，请重试");
      else if (!oldUser)
      {
        WeChatUser.create(user, function (err, newUser){
          cb(null,newUser);
        });
      }
      else
      {
        WeChatUser.updateAll({openid:user.openid}, function (err, count) {
          if (err) 
            cb("服务器错误，请重试");
          else
            cb(null, user);
        })
      }
    })
  }
  function wechatLogin (openid, cb) {
    WeChatUser.login({
      email: openid + "@etuan.org",
      password: openid
    },cb);
  }
  
  // function createOrUpdateUserByCode(code, state, assistModel, callback){
  //   function updateAssistModel (assistModel, user, cache, cb){
  //     assistModel.updateAll({ticket: state},{
  //       isConfirm: 1,
  //       userId: user.id
  //     },function (err, count){
  //       if(err) cb({"msg": "出错了,请刷新后登陆-"});
  //       else cb(null, user, cache);
  //     });
  //   }
  //   assistModel.findOne({where: {ticket: state}}, function (err, cache) {
  //     if (err) callback({"msg": "-出错了,请刷新后登陆"});
  //     else if(!cache) callback({"msg": "TICKET过期可能过期了,刷新后再试试"});
  //     else
  //       client.getUserByCode(code, function (err, user) {
  //         user.email = user.openid + "@etuan.org";
  //         user.password = user.openid;
  //         WeChatUser.findOne({where:{openid: user.openid}}, function (err, beUser){
  //           if(err) callback({"msg": "-保存信息时出错了,刷新后再试试"});
  //           if(beUser) WeChatUser.updateAll({openid: user.openid},function (err, count){
  //             if(err) callback({"msg": "保存信息时出错了-,刷新后再试试"});
  //             else updateAssistModel (assistModel, beUser, cache, callback);
  //           });
  //           else
  //             WeChatUser.create(user, function (err, newUser){
  //               if(err)  callback({"msg": "保存信息时出错了,刷新后再试试-"});
  //               else updateAssistModel (assistModel, newUser, cache, callback);
  //             });
  //         });
  //       });
  //   });
  // }
  /**
   * 微信oauth2.0回调地址
   * url /api/WeChatUsers/oauth?code=CODE&state=STATE
   * get code=CODE&state=STATE
   * @param  {[type]} state 生成oauth2.0链接时生成state                                                                                                 [description]
   * @param  {[type]} code 从微信服务器返回
   * @return { msg:"some msg"} 当返回msg为success时表示成功，其他可以直接展示给用户                                                                                          [description]
   */
  WeChatUser.beforeRemote("oauth", function (ctx, unused, next) {
    var state = ctx.req.query.state;
    var code = ctx.req.query.code;
    var assistModel = WeChatUser.app.models.LoginCache;
    createOrUpdateUserByCode(code, state, assistModel, function (err, user){
      if(err) ctx.res.render("phone.ejs", err);
      else ctx.res.render("phone.ejs", {"msg": "success", "state": state});
    });
  });

  /**学号验证
   * url /api/WeChatUsers/:userId
   * put {"studentId":学号,"password":"密码"}
   * @return model的一个实例
   */
  WeChatUser.beforeRemote("prototype.updateAttributes", function (ctx, instance, next) {
    var data = ctx.req.body;
    var userId = ctx.req.query.userId;
    if (data.studentId === undefined || data.password === undefined)
      ctx.res.send({"err": "密码学号都不能为空"});
    else
      hduConfim.ihdu(data.studentId, data.password, function (name) {
        if (!name) ctx.res.send({"err": "获取学生姓名失败"});
        if (name === 'mistake_notice') ctx.res.send({err: '密码或学号错误'});
        else
          WeChatUser.findOne({where: {id: userId}}, function (err, userInfo) {
            updatedAt = userInfo.updatedAt || new Date();
            histories = userInfo.weChatUserHistories;
            data.studentName = name;
            data.university = '杭州电子科技大学';
            data.updatedAt = new Date();
            data.verifiedDate = new Date();
            var history = {
              "university": data.university,
              "studentId": data.studentId,
              "studentName": name,
              "verifiedDate": new Date(),
              "updatedAt": updatedAt,
              "id": histories.length + 1
            };
            histories.push(history);
            data.weChatUserHistories = histories;
            next();
          });
      });
  });

  //保存更新时间
  WeChatUser.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      ctx.instance.updatedAt = new Date();
    }
    else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });

  //创建表单结果之前写入ip
  WeChatUser.beforeRemote('prototype.__create__formResults', function (ctx, instance, next) {
    ctx.req.body.ip = getClientIp(ctx.req);
    next();
  });

  //创建投票结果之前写入ip
  WeChatUser.beforeRemote('prototype.__create__voteResults', function (ctx, instance, next) {
    ctx.req.body.ip = getClientIp(ctx.req);
    next();
  });

  //修改accesstoken有效时间
  WeChatUser.beforeRemote('login', function (ctx, instance, next) {
    ctx.req.body.ttl = 7200;
    next();
  });

  function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  };

};

