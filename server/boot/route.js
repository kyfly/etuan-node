var etuan_module = '../../common/modules/';
var upload = require(etuan_module + "upload.js");
var Verify = require(etuan_module + "Verify.js");
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
    if(inarray(dirs,query.dir) && userId && query.dir != undefined)
      var path = query.dir +"/" + app.token.userId;
    else{
      //res.send({"state":400,code:"access failed"});
      return;
    }
    switch(query.action){
      case 'config':
        res.send(require('../../client/ueditor/config.json'));break;
      case 'uploadimage':
        res.up_img('images/' + path);break;
      case 'uploadtext':
        res.up_text('html/' + path);
      case 'listimage':
        res.image_list('images/'+path);
      }
  });
}));
};