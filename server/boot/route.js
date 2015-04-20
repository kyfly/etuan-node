var path = require('path');
//var ueditor = require("ueditor");
var Busboy = require('busboy');
var upload = require("../../common/modules/upload.js");
var bodyParser = require('body-parser');
module.exports = function(app) {
///所有图片,html文本上传都用这个,ueditor修改ueditor.config.js中serverUrl: "/ue/uploads"
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/ue/uploads", upload(function(req, res, next) {
  console.log(req.accessToken);
  var dir = req.query.dir;
  if(dir === undefined)
    dir = 'ue';
  if (req.query.action === 'uploadimage') {
    var img_url = 'images/'+dir;
    res.up_img(img_url); 
  }else if(req.query.action === 'uploadtext'){
    var html_url = 'html/'+dir;
    res.up_text(html_url);
  }else if(req.query.action === 'config'){
      //ueditor后台配置文件位置
  	res.send(require('../../client/ueditor/config.json'));
  }else if(req.query.action === 'listimage'){
    res.image_list('images/'+dir);
  }
}));
///上传
};