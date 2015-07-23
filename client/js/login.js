function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    var bIsWX = sUserAgent.match(/MicroMessenger/i) == "micromessenger";
    
    if (bIsWX) {
        return "wechat";
    } else if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return "mobile";
    }else{
      return "pc";
    }
}

function loginCheck(t) {
  var tmpInfo = JSON.parse(window.localStorage.getItem(t));
  var bower = browserRedirect();
  if (!tmpInfo || !tmpInfo.accessToken || !tmpInfo.userId
    || !tmpInfo.loginTime || !tmpInfo.ttl
    || (new Date() - new Date(tmpInfo.loginTime) > tmpInfo.ttl * 1000)
  ) {
    var url = window.location.href;
    window.localStorage.removeItem(t);
    switch (t) {
      case 'b3JnYW5p':
        window.location = '/login';
        break;
      case 'd2VjaGF0':
        if (bower === 'pc')//直接跳转到二维码登录页面，登录页面的serch属性应该加登陆后应该到的地址
          window.location = '/wx-tmp.html?next=' + url;
        else if (bower === 'wechat') {
          window.localStorage.setItem('d2VjaGF0',JSON.stringify({"next": url}));
          window.location = '/api/WechatUsers/fromWechat';
        }
        else
          window.location = "/warning.html";
        break;
    }
  }
}
