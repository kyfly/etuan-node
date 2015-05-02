var checkStatus = function () {
  var ajax = new XMLHttpRequest();
  ajax.open('GET','/api/LoginCaches/confirm?state='+token,true);
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      var data = JSON.parse(ajax.responseText);
      if (data.msg === "success" && ajax.status === 200) {
        //data expect {"msg":"success","url":url,"userInfo":userInfo,"token":token}
        console.log(data);
        /*
        var lsTmp = {
          accessToken:data.token,
          userId:data.userInfo.userId,
          loginTime:,
          ttl:data.
        };
        window.localStorage.setItem('d2VjaGF0',data);
        window.localStorage.href = data.url;
        */
      }
      else if (ajax.status === 200 || ajax.status === 304) {
        document.getElementById('logstatus').innerHTML = data.msg;
      };
    };
  };
};
var createQrcode = function (url) {
  var qr = qrcode(12, 'L');
  qr.addData(url);
  qr.make();
  document.getElementById('qrcode').innerHTML = qr.createImgTag(4,12);
};
createQrcode(url);
setInterval(checkStatus, 4000);
setInterval(function () {
  document.location.reload(true);
  },
  60000
);
