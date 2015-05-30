module.exports = function(VoteResult) {

  //vote-result检查１．微信绑定　２．最大投票数　３．已经投票 4.开始时间结束时间
  VoteResult.observe('before save', function(ctx, next) {
    var Vote = VoteResult.app.models.Vote;
    var weChatUser = VoteResult.app.models.WeChatUser;
    try {
      VoteResult.findOne({ where: {weChatUid: ctx.instance.weChatUid, voteId: ctx.instance.voteId}}, function(err, voteResult) {
        console.log(ctx.instance.weChatUid );
        console.log(voteResult);
        if(voteResult === null) {
          Vote.findOne({ where: { id: ctx.instance.voteId }}, function(err, vote) {
            if(vote.startTime <= new Date() && vote.stopTime >= new Date()) {
              if(ctx.instance.results.length <= vote.maxVote) {
                switch(vote.verifyRule){
                  case 'studentId':
                    if(weChatUser.studentId != null) {
                      next();
                    }
                    else {
                      next({'status': '400', 'message': '需要绑定学号'});
                    }
                    break;
                  default:
                    next();
                    break;
                }
              }
              else {
                next({'status': '400', 'message': '超过最大投票数'});
              }
            }
            else {
              next({'status': '400', 'message': vote.startTime > new Date()?'还未开始': '已经结束'});
            }
          });
        }
        else {
          next({'status': '400', 'message': '已经投过票了'});
        }
      });
    }
    catch (e) {
      next(e);
    }
  });

  //vote-result保存之后将投票项的票数加一
  VoteResult.observe('after save', function(ctx, next) {
    var Vote = VoteResult.app.models.Vote;
    try {
      Vote.findOne({where: {_id: ctx.instance.voteId}},function(err, vote) {
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
    }
    catch (e) {
      next(e);
    }
    next();
  });

};
