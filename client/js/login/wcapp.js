var checkStatus = function () {
  var ajax = new XMLHttpRequest();
  ajax.open('GET','/api/LoginCaches/confirm?state='+token,true);
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      var data = JSON.parse(ajax.responseText);
      console.log(data);
      if (data.msg === "success" && ajax.status === 200) {
        //data expect {"msg":"success","url":url,"userInfo":userInfo,"token":token}
        console.log(data);
        //window.localStorage.setItem('weChatUserInfo',data.userInfo);
        //window.localStorage.setItem('weChatAccessToken',data.token);
        //window.localStorage.href = data.url;
      }
      else if (ajax.status === 200 || ajax.status === 304) {
        document.getElementById('logstatus').innerHTML = data.msg;
      };
    };
  };
};
var createQrcode = function (url) {
  var qr = qrcode(13, 'Q');
  qr.addData(url);
  qr.make();
  document.getElementById('qrcode').innerHTML = qr.createImgTag(4);
};
createQrcode(url);
setInterval(checkStatus, 4000);
setInterval(function () {        
  document.location.reload(true);
  }, 
  60000
);