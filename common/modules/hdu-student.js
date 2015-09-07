function http_get(url,cb)
{
    var http = require('http');
    var req = http.get(url,function(response){
      var body = [];
      var headers = response.headers;
      response.on('data', function (chunk) {
        body.push(chunk);
      });
      response.on('end', function () {
        body = Buffer.concat(body);
      	cb(body.toString(),headers);
      });
    });
    req.end();
}
exports.ihdu = function ihdu(id,pwd,cb)
{
    var url = 'http://cas.hdu.edu.cn/cas/login?service=http://jxgl.hdu.edu.cn/index.aspx';
    var http = require('http');
    http_get(url,function(data,headers){
        var it = data.match(/name=\"lt\" value=\"(.+?)\"/)[1];
        //组合登录接口
        var url = 'http://cas.hdu.edu.cn/cas/login?encodedService=http%253a%252f%252fi.hdu.edu.cn%252fdcp%252fportal%252fgVarInit.jsp%253fp%253dwkHomePage%2526gId%253dnull%2526user_id%253dnull&service=http%3A%2F%2Fi.hdu.edu.cn%2Fdcp%2Fportal%2FgVarInit.jsp%3Fp%3DwkHomePage%26gId%3Dnull%26user_id%3Dnull&serviceName=null&loginErrCnt=0&username='+id+'&password='+pwd+'&lt='+it;
        http_get(url,function(data,headers){
          if(data.match(/class="mistake_notice"/) === null){
            //获取ticket链接
            url = data.match(/\<a href=\"(.+?)\"\>/)[1];
            http_get(url,function(data,headers){
                var cookie = headers['set-cookie'];
                var path = '/dcp/portal/gVarInit.jsp?p=wkHomePage&gId=null&user_id=null';
                var options ={
                    host:'i.hdu.edu.cn',
                    port:80,
                    path:path,
                    headers:{
                        'Cookie':cookie[0].match(/.+?\;/)[0]+cookie[1].match(/(.+?);/)[1]
                    }
                }
                var requset = http.get(options,function(response){
                    var body = [];
                    var headers = response.headers;
                    response.on('data', function (chunk) {
                        body.push(chunk);
                    });
                    response.on('end', function () {
                        data = Buffer.concat(body);
                        name = data.toString().match(/edpinfo.user.user_name=\'(.+?)\'/)[1];
                        cb(name);
                    });
                });
                requset.end();
            });
          }else{
            cb("mistake_notice");
          }
        });
    });
}
