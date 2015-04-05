var path = require('path');
var ueditor = require("ueditor");
var bodyParser = require('body-parser');
module.exports = function(app) {
  
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
  	res.send(require('../../client/ueditor/config.json'));
}));
///图片上传
};