module.exports = function(VoteResult) {

	//
	VoteResult.observe('after save', function(ctx, next) {
		var Vote = VoteResult.app.models.Vote;
		 Vote.findOne({where:{_id:ctx.instance.voteId}},function(err,vote){
		 	console.log(vote.subitems);
		 	ctx.instance.results.forEach(function(id){
				vote.subitems.updateById(id,{"count":vote.subitems.at(id).count+1},function(err,instace){
					if(err){
						console.error(err);
					}else{
						console.log(instace);
					}
				});
		 	});
		});
		next();
	});
};
