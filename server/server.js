var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);
var path = require('path');
var bodyParser = require('body-parser')
var ueditor = require("ueditor")
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());


app.use("/ue/uploads", ueditor( __dirname, function(req, res, next) {
  if(req.query.action === 'uploadimage'){
    var foo = req.ueditor;
    var img_url = 'yourpath';
    res.ue_up(img_url);
  }
  else if (req.query.action === 'listimage'){
    var dir_url = 'your img_dir'; 
    res.ue_list(dir_url) 
  }else if(req.query.action === 'config')
  	res.send(require('../client/ueditor/config.json'));
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/ueditor.config.json')
}}));

var oss = require('oss');

app.use('/oss',function(req,res){
	var client = new oss({
	   accessId : "MMwC9Qmvatxk3UIT",
	   accessKey : "W5nTtKZ46lRvDtJKo8ViWahMlGFi34"
	});
	// client.list_bucket(function(err,results){
 //            res.send(results);
 //          });
	client.put_object( { 
		bucket : "etuan-node", 
	    object : 'name' , 
	    srcFile : 'C:\\Users\\LJD\\Pictures\\Camera Roll\\59651e8b84a67512041dbf4259079fb6.jpg'},
	    function(err,results){
	      if(err) {
	        res.send(err);
	        return;
	      }
	      console.log('operation finished........');
	      res.send(results);
	    });
});




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
