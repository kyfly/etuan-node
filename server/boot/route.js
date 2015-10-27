var etuan_module = '../../common/modules/';
var upload = require(etuan_module + "upload.js");
var Verify = require(etuan_module + "verify.js");
var bodyParser = require('body-parser');
module.exports = function(app) {
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

function inarray(arr, obj) {  
  var i = arr.length;  
  while (i--) {  
    if (arr[i] === obj) {  
      return true;  
    }  
  }  
  return false;  
}  
var verify = new Verify(app.models.AccessToken,app.models.OrganizationUser); 
app.use("/ue/uploads", upload(function(req, res, next) {
  var query = req.query;
  var dirs = ['ue','form','vote','logo'];
  verify.getUserId(query.access_token,function (err,userId){
    if(err) return;
    if(inarray(dirs,query.dir) && userId)
      var path = userId + "/" + query.dir;
    else{
      return;
    }
    switch(query.action){
      case 'config':
        res.send(require('../../client/ueditor/config.json'));break;
      case 'uploadimage':
        res.up_img('images/' + path);break;
      case 'uploadtext':
        res.up_text('html/' + path);break;
      case 'listimage':
        res.image_list('images/'+userId);
      case "uploadfile":
        res.up_img('files/'+userId);
      }
  });
}));
};