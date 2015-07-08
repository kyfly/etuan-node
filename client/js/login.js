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
    var url = '/api/WechatUsers/wechatLogin?' + window.location.hash.substr(2) + '&url=' +window.location.href;
    window.localStorage.removeItem(t);
    switch (t) {
      case 'b3JnYW5p':
        window.location = '/login';
        break;
      case 'd2VjaGF0':
        if (bower === 'pc')//直接跳转到二维码登录页面，登录页面的serch属性应该加登陆后应该到的地址
          window.location = "/wx-tmp.html";
        else if (bower === 'wechat') {
          window.location = '/api/WechatUsers/fromWechat?next='+"登陆后的地址";
        }
        else//某个提示页面，这个页面应该显示“用微信客户端访问或者电脑访问”
          window.location = "/";
        break;
    }
  }
}
