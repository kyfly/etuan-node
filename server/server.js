var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

app.use(loopback.context());
app.use(loopback.token());

app.use(function setCurrentUser(req, res, next) {
    if (!req.accessToken) {
        return next();
    }
    app.models.OrganizationUser.findById(req.accessToken.userId, function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error('No user with this access token was found.'));
        }

        var loopbackContext = loopback.getCurrentContext();
        if (loopbackContext) {
              loopbackContext.set('currentUser', user);
        }
        next();
     });
});
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);
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
  var server = app.start();
}

app.use(loopback.static('../client'));

var socket = require('../common/modules/websocket.js')(app, server);
socket.start();

