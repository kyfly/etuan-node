function createQrcode (url) {
  var qr = qrcode(12, 'L');
  qr.addData(url);
  qr.make();
  document.getElementById('qrcode').innerHTML = qr.createImgTag(4, 12);
}
function getAuthData (cb) {
  var ajax = new XMLHttpRequest();
  ajax.open('GET', '/api/WechatUsers/formPC', true);
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
              ttl: data.token.ttl
            };
            window.localStorage.setItem('d2VjaGF0', JSON.stringify(lsTmp));
            //这里跳转到应该跳转的页面
            
            data.userInfo.studentId ? window.location = window.location.search.substr(6) || '/' : window.location = '/student.html?referer=' + window.location.search.substr(6) || '/';
          }
          else if (ajax.status === 200 || ajax.status === 304) {
            document.getElementById('logstatus').innerHTML = data.msg;
          }
          ;
        }
        ;
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
