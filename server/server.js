var os = require('os');
var fs = require('fs');
var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');
var ueditor = require("ueditor");
var bodyParser = require('body-parser');
var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

///图片上传,记得用/common/mosules/ueditor.js替换/node_modules/ueditor/index.js
///所有图片上传都用这个,img_url 开始结尾不加"/",ueditor修改ueditor.config.js中serverUrl: "/ue/uploads"
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/ue/uploads", ueditor( __dirname, function(req, res, next) {
  if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;
        var img_url = 'images/ueditor';
        res.ue_up(img_url); 
  }else if(req.query.action === 'config')
      //ueditor后台配置文件位置
  	res.send(require('../client/ueditor/config.json'));
}));
///图片上传
app.use(function(req,res,next){
  res.setHeader('X-Powered-By', 'Kyfly');
  next();
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

app.use(loopback.static('../client'));
