module.exports = function(Activity) {
  //浏览活动将浏览量加一
  Activity.remoteMethod('view', {
    accepts: {arg: 'id', type: 'string'},
    http: {verb: 'GET', path: '/view/:id'}
  });  

  Activity.remoteMethod('ueContent', {
    accepts: {arg: 'url', type: 'string'},
    returns: {arg: 'content', type: 'string'},
    http: {verb: 'GET', path: '/get-content'}
  });
  Activity.ueContent = function (url, cb) {
    var http = require('http');
    var req = http.get(url, function(response){
      var body = [];
      var headers = response.headers;
      response.on('data', function (chunk) {
        body.push(chunk);
      });
      response.on('end', function () {
        body = Buffer.concat(body);
        cb(null, body.toString());
      });
    });
    req.end();
  }
  Activity.view = function(id, cb) {
    Activity.update({id: id}, {$inc: {viewCount: 1}}, function(err, result) {
      cb(null);
    });       
  }  
};
