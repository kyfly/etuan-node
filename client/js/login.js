function loginCheck (t) {
  var tmpInfo = JSON.parse(window.localStorage.getItem(t));
  if (!tmpInfo || !tmpInfo.accessToken || !tmpInfo.userId
    || !tmpInfo.loginTime || !tmpInfo.ttl
    || (new Date() - new Date(tmpInfo.loginTime) > tmpInfo.ttl)
  ) {
    window.localStorage.removeItem(t);
    switch (t) {
      case 'b3JnYW5p':
        window.location = '/login';
        break;
      case 'd2VjaGF0':
        window.location = '/wx-tmp.html';
        break;
    }
  }
}
