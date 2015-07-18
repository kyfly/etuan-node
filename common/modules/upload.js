var fs = require('fs');
var os = require('os');
var Path = require('path');
var Busboy = require('busboy');
var ALY = require('aliyun-sdk');
var OSS = require('../../server/config').oss;
var oss = new ALY.OSS({
  "accessKeyId": OSS.accessKeyId,
  "secretAccessKey": OSS.secretAccessKey,
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
      var tmpdir = Path.join(os.tmpDir(), Path.basename(filename));
      var name = new Date().getTime().toString() + MathRand(6) + Path.extname(tmpdir);
      var F;
      file.pipe(F = fs.createWriteStream(tmpdir));
      F.on('finish',function(){
        fs.readFile(tmpdir,function(err,data){
          if(err) 
            res.send({message: "保存失败", error: err.code});
          else 
            __oss(Path.join(img_url,name),data,function(err,data){
              if(err) 
                res.send({message: "保存失败", error: err.code});
              else
                res.send({
                    'url': OSS.url+img_url+'/'+name,
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
    Bucket: 'etuan',
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
        var path = dir + "/" + (new Date().getTime().toString() + MathRand(6)+".html");
        __oss(path,req.body.content,function(err,aliMsg){
        if(err) {
          res.send({message: "保存失败", error: err.code});
        }
        else 
          res.json({
            "url": OSS.url + path,
            "state":"SUCCESS"
          });
        });
      }
      callback(req, res, next);
      return;
    }else if(req.query.action === 'listimage'){
      res.image_list = function(path){
        oss.listObjects({ 
          Bucket: 'etuan-node',
          Prefix: path
        },function(err,data){
          if(!data)
            res.send({message: "获取列表保存失败", error: err.code});
           var prefix = OSS.url;
           var list = [];
           data.Contents.forEach(function(content){
              var item = {
                url:prefix + content.Key,
                mtime:new Date().getTime()
              }
              list.push(item);
           });

           res.send({
            state:'SUCCESS',
            list:list,
            start:0,
            total:data.Contents.length
          });
        });
      }
      callback(req, res, next);
      return;
    }
  };
};
module.exports = upload;