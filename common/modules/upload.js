var fs = require('fs');
var os = require('os');
var path = require('path');
var Busboy = require('busboy');
var ALY = require('aliyun-sdk');

var oss = new ALY.OSS({
  "accessKeyId": "MMwC9Qmvatxk3UIT",
  "secretAccessKey": "W5nTtKZ46lRvDtJKo8ViWahMlGFi34",
  endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
  apiVersion: '2013-10-15'
});

function MathRand(n) 
{ 
  var Num=""; 
  for(var i=0;i<n;i++) 
    Num += Math.floor(Math.random()*10); 
  return Num;
} 

function __img(req,res,next,callback){
  var busboy = new Busboy({
        headers: req.headers
      });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    res.up_img = function(img_url) {
      var tmpdir = path.join(os.tmpDir(), path.basename(filename));
      var name = new Date().getTime().toString() + MathRand(6) + path.extname(tmpdir);
      var F;
      file.pipe(F = fs.createWriteStream(tmpdir));
      F.on('finish',function(){
        fs.readFile(tmpdir,function(err,data){
          if(err) return;
          else 
            __oss(path.join(img_url,name),data,function(err,data){
              if(err) return;
              else
                res.json({
                    'url': 'http://etuan-node.oss-cn-hangzhou.aliyuncs.com/'+img_url+'/'+name,
                    'title': req.body.pictitle,
                    'original': filename,
                    'state': 'SUCCESS'
                });
            });
        });
      });
    };
    callback(req, res, next);
  });
  req.pipe(busboy);
}
function __oss(path,data,cb){
  path = path.replace(/\\/g,"/");
  oss.putObject({
    Bucket: 'etuan-node',
    Key:  path,
    Body:data,
    ServerSideEncryption: 'AES256',
    Expires: new Date()   
  },cb);
}
function upload(callback) {
  return function(req, res, next) {
   if (req.query.action === 'uploadimage') {
      __img(req,res,next,callback);
      return;
    }else if (req.query.action === 'config') {
      callback(req, res, next);
      return;
    }else if(req.query.action === 'uploadtext'){
      res.up_text = function(dir){
        var path = path.join(dir,new Date().getTime().toString() + MathRand(6)+".html");
        __oss(path,req.body,function(err,aliMsg){
          if(err) return;
          else 
            res.json({
              "url":path.join('http://etuan-node.oss-cn-hangzhou.aliyuncs.com/', path),
              "state":"SUCCESS"
            });
        });
        callback(req, res, next);
      }
      return;
    }
  };
};
module.exports = upload;