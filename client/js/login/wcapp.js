function createQrcode (url) {
  var qr = qrcode(12, 'L');
  qr.addData(url);
  qr.make();
  document.getElementById('qrcode').innerHTML = qr.createImgTag(4, 12);
}
function getAuthData (cb) {
  var ajax = new XMLHttpRequest();
  ajax.open('GET', '/api/WechatUsers/fromPC', true);
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      var data = JSON.parse(ajax.responseText);
      cb(data);
    }
  }
}
function wechatLogin() {
  getAuthData(function (data) {
    createQrcode(data.qrcodeUrl);
    var token = data.state;
    setInterval(function () {
      var ajax = new XMLHttpRequest();
      var Stu = new XMLHttpRequest();
      ajax.open('GET', '/api/WechatUsers/confirm?state=' + token, true);
      ajax.send();
      ajax.onreadystatechange = function () {
        if (ajax.readyState === 4) {
          var data = JSON.parse(ajax.responseText);
          if (data.msg === "success" && ajax.status === 200) {
            //data expect {"msg":"success","url":url,"userInfo":userInfo,"token":token}
            var lsTmp = {
              accessToken: data.token.id,
              userId: data.token.userId,
              loginTime: data.token.created,
              ttl: data.token.ttl,
              school: data.userInfo.university || '没绑定学校',
              studentId: data.userInfo.studentId
            };
            window.sessionStorage.d2VjaGF0JSON.stringify(lsTmp);
            //这里跳转到应该跳转的页面

            if (data.userInfo.studentId)
              window.location = window.sessionStorage.next || '/' ;
            else {
              var rhtoken = sessionStorage.redHomeToken;
              if (!rtoken)
                      window.location = '/student.html';
              if (rtoken){
                Stu.open('GET', '/api/WeChatUsers/stuInfoFromRH?id='+ data.token.userId +'&token=' + rhtoken);
                Stu.send();
                Stu.onreadystatechange = function () {
                  if (Stu.readyState === 4) {
                    var sdata = JSON.parse(Stu.responseText);
                    if (sdata.data === 0 && Stu.status === 200) {
                      window.location = '/student.html';
                    } else if (sdata.data && Stu.status === 200) {
                      lsTmp.school = '杭州电子科技大学';
                      lsTmp.studentId = sdata.data.studentId;
                      sessionStorage.d2VjaGF0 = JSON.stringify(lsTmp);
                      window.location = window.sessionStorage.next || '/';
                    }
                  }
                }
              }
            }
          }
          else if (ajax.status === 200 || ajax.status === 304) {
            document.getElementById('logstatus').innerHTML = data.msg;
          }
        }
      };
    }, 4000);
    setInterval(function () {
        document.location.reload(true);
      },
      60000
    );
  });
}
wechatLogin();
