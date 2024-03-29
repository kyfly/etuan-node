var config = require('../../server/etuan');
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
  WeChatUser.remoteMethod("fromPC",
    {
      returns: {arg: "data", type: "object"},
      description: "获取微信登录链接,返回{state:state,url:url}",
      http: {path: "/fromPC", verb: 'get'}
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
  WeChatUser.remoteMethod('stuInfoFromRH',
    {
      accepts: [
        {arg: 'id', type: 'string'},
        {arg: 'token', type: 'string'}
      ],
      description: "红家学号获取",
      returns: {arg:"data",type:'object'},
      http: {path: "/stuInfoFromRH", verb: 'get'}
    });

  WeChatUser.remoteMethod('msgRe', {
    accepts: [
      {arg: 'msgId', type: 'number'},
      {arg: 'resultId', type: 'string'}
    ],
    returns:{arg:'status',type: "number"},
    http: {verb: 'GET', path: '/:id/msgRe'}
  });


  WeChatUser.msgRe = function(msgId, resultId, cb) {

    WeChatUser.app.models.FormResult.findOne({where:{id: resultId,'messages.messageId':msgId}}, function(err, result) {
      if (err || !result)
        cb(null, 400);
      else {
        for (var i in result.messages) if (result.messages[i].messageId === msgId) {
          result.messages[i].messageId = -1;
          break;
        }
        WeChatUser.app.models.FormResult.updateAll({id: resultId,'messages.messageId':msgId},{messages: result.messages},function (err, instance) {
            if (err)           
               cb(null,500);
            else
               cb(null,200);
        });
      }
    });
  }
  WeChatUser.stuInfoFromRH = function (id, token, cb) {
    var http = require('http');
    var qs = require('querystring');
    var string = qs.stringify({
      method:"getStudent",
      token: token,
      thirdpart: "etuan"
    });
    var req = http.request({
      host: 'wechat.redhome.cc',
      port: '80',
      path: '/web/thirdpart/',
      method: 'POST',
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
        "Content-Length":string.length
      }
    },function(response){
      var body = [];
      var headers = response.headers;
      response.on('data', function (chunk) {
        body.push(chunk);
      });
      response.on('end', function () {
        body = Buffer.concat(body);
        var rh = JSON.parse(body.toString());
        if(rh.error)
        {
          cb(rh, 0);
        } else {
          //获取的学号
          var stuInfo = {
            studentId: rh.studentID,
            studentName: rh.name,
            university: '杭州电子科技大学'
          };
          WeChatUser.updateAll({
              id: id
            }, stuInfo,
            function(err, count){
            if (err)
                cb(err);
              else
               cb(null,stuInfo);
            });
        }
      });
    });
    req.write(string);
    req.end();
  }
  WeChatUser.reLoadLogin = function (openid, fn) {
    WeChatUser.login({
      email: openid + "@etuan.org",
      password: openid
    }, fn);
  }
  WeChatUser.beforeRemote('confirm', function (ctx, unused, next) {
    return WeChatUser.app.models.LoginCache.confirm(ctx, unused, next);
  });
  function getTicket (cb) {
    var ticket = __randomString(30) + new Date().getTime().toString();
    var loginCacheObj = {
      createAt: new Date(),
      ticket: ticket,
      isConfirm: 0,
      request: 0,
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
  WeChatUser.beforeRemote("fromPC", function (ctx, unused, next) {
    getTicket(function (err, ticket) {
      var url = client.getAuthorizeURL(config.wechat.redrectUrl + '/api/WeChatUsers/oauth', ticket, 'snsapi_userinfo');
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
      var url = client.getAuthorizeURL(config.wechat.redrectUrl + '/api/WeChatUsers/phoneoauth?', ticket, 'snsapi_userinfo');
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
    var state = ctx.req.query.state;
    wxchatReQuest(state, function (err, num){
      if (err)
        return ctx.res.render("phone-login.ejs", {'status': "fail", 'msg': err, "token":{}, "userInfo": {}});
      if (num === 0)
      {
        getWechatInfoByCode(code, function (err, wechatUserInfo) {
          if (err || !wechatUserInfo)
            return ctx.res.render("phone-login.ejs", {'status': "fail", 'msg': "获取微信信息失败", "token":{}, "userInfo": {}});
          else
            createWechatUser(wechatUserInfo, function (err, user) {
              if (err)
                return ctx.res.render("phone-login.ejs", {'status': "fail", 'msg': err, "token":{}, "userInfo": {}});
              else
              {
                WeChatUser.reLoadLogin(user.openid, function (err, token) {
                  if (err)
                    return ctx.res.render("phone-login.ejs", {'status': "fail", 'msg': "登录失败", "token":{}, "userInfo": {}});
                  else
                    return ctx.res.render("phone-login.ejs", {'status': "success",'msg': "获取微信信息成功", 'token': token, "userInfo": user});
                });
              }
            });
        });
      }
    });
  });
  function wxchatReQuest (state, cb) {
    WeChatUser.app.models.LoginCache.findOne({where:{and:[{ticket: state}, {request: 1}]}}, function (err, loginInfo) {
      if(err)
        return cb("出错了，请重试");
      else if (!loginInfo)
      {
        WeChatUser.app.models.LoginCache.updateAll({ticket: state}, {request: 1}, function (err, count) {
          if (err)
            return cb("出错了，请重试");
          else
            return cb(null,0);
        });
      }
      else
      {
        return cb(null, 1);
      }
    });
  }
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
        user.password=oldUser.password;
        WeChatUser.updateAll({openid:oldUser.openid}, user, function (err, count) {
         if (err)
            cb("服务器错误，请重试");
          else
            cb(null, oldUser);
        })
      }
    })
  }
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
    wxchatReQuest(state, function (err, num){
      if (err)
        ctx.res.render("phone.ejs", {"status": "fail", "msg" : err, "state": state});
      else if (num === 0)
      {
        getWechatInfoByCode(code, function (err, wechatUserInfo) {
          if (err || !wechatUserInfo)
            ctx.res.render("phone.ejs", {'status': "fail", 'msg': "获取微信信息失败,请刷新二维码重试", "state": state});
          else
            createWechatUser(wechatUserInfo, function (err, user) {
              if (err)
                ctx.res.render("phone.ejs", {'status': "fail", 'msg': err, "state": state});
              else
              {
                WeChatUser.app.models.LoginCache.updateAll({ticket: state},{
                  isConfirm: 1,
                  userId: user.id
                },function (err, count){
              if(err)
                    ctx.res.render("phone.ejs",{"status": "fail","msg": "出错了,请刷新后登陆-", "state": state});
                  else
                    ctx.res.render("phone.ejs", {"status": "success", "msg": "获取微信信息成功", "state": state});
                });
              }
            });
        });
      }
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
    if (data.university !== '杭州电子科技大学')
    {
      data.updatedAt = new Date();
      data.studentName = data.password;
      data.password = undefined;
      data.verifiedDate = new Date();
      next();
      return;
    }
    if (data.studentId === undefined || data.password === undefined)
      ctx.res.send({"err": "密码学号都不能为空"});
    else {
      hduConfim.ihdu(data.studentId, data.password, function (name) {
        if (!name) ctx.res.send({"err": "获取学生姓名失败"});
        if (name === 'mistake_notice') ctx.res.send({err: '密码或学号错误'});
        else {
          data.studentName = name;
          data.password = undefined;
          data.university = '杭州电子科技大学';
          data.updatedAt = new Date();
          data.verifiedDate = new Date();
          next();
        }
      });
    }
  });
  WeChatUser.afterRemote("prototype.updateAttributes", function (ctx, instance, next) {
    var history = {
      "studentName" : instance.studentName,
      "university" : instance.university,
      "updatedAt" : new Date(),
      "verifiedDate" : instance.verifiedDate,
      "studentId" : instance.studentId,
      'id' : instance.weChatUserHistories.length
    };
    instance.histories.create(history, function (err, history) {
      if (err)
        return next(err);
      ctx.res.send({university: instance.university});
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

