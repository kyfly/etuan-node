module.exports = function(VoteResult) {

  VoteResult.observe('before save', function (ctx, next) {
    next({"name":"someError", "status":"422", "message":"A error occurred!"})
  });

	//vote-result保存之后将投票项的票数加一
	VoteResult.observe('after save', function(ctx, next) {
		var Vote = VoteResult.app.models.Vote;

    Vote.updateAll({_id:ctx.instance.voteId},{'$inc' : {maxVote : 1} }, function(err, instance) {
      console.log(instance);
    });

		Vote.findOne({where:{_id:ctx.instance.voteId}},function(err, vote){
		 	ctx.instance.results.forEach(function(id){

        vote.subitems.findById(id, function(err, instance) {
          if(err) {
            next(err);
          }
          else {
            instance.updateAttribute('count', instance.count+1, function(err, instance) {
              if(err) {
                next(err);
              }
            });
          }
        });
		 	});
		});
		next();
	});
};
