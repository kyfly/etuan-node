var Q = require('q');
var PromiseFunction = {
	findOne:function(model, condition) {
        return Q.Promise(function(resolve, reject, notify) {
            model.findOne(condition, function(err, obj) {
                if(err) {
                    reject(err);
                }else {
                    resolve(obj);
                }
            });
    	});
	},
	findById:function(model, id) {
		return Q.promise(function(resolve, reject, notify) {
			model.findById(id, function(err, obj) {
				if(err) {
					reject(err);
				}
				else {
					resolve(obj);
				}
			});
		});
	}
}
module.exports = PromiseFunction;