module.exports = function(Activity) {
  //浏览活动将浏览量加一
  Activity.remoteMethod('view', {
    accepts: {arg: 'id', type: 'string'},
    http: {verb: 'GET', path: '/view/:id'}
  });  

  Activity.view = function(id, cb) {
    Activity.update({id: id}, {$inc: {viewCount: 1}}, function(err, result) {
      cb(null);
    });       
  }  
};
