module.exports = function (Vote) {

  //浏览活动将浏览量加一
  Vote.remoteMethod('view', {
    accepts: {arg: 'id', type: 'string'},
    http: {verb: 'GET', path: '/view/:id'}
  });  

  Vote.view = function(id, cb) {
    Vote.update({id: id}, {$inc: {viewCount: 1}}, function(err, result) {
      cb(null);
    });       
  }   

  //在写入投票的时候，强制把子项计数改成0
  function resetCount(model) {
    model.voteSubitems.forEach(function (subitem) {
      subitem.count = 0;
    });
  }

  Vote.beforeCreate = function (next, model) {
    resetCount(model);
    next();
  };

  // Vote.beforeUpdate = function (next, model) {
  //   resetCount(model);
  //   next();
  // } 

};
