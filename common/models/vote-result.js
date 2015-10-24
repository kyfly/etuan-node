module.exports = function(VoteResult) {
    var Q = require('q');
    var findOne = require('../modules/Promise.js').findOne;

    //vote-result检查１．微信绑定　２．最大投票数　３．已经投票 4.开始时间结束时间
    VoteResult.observe('before save', function(ctx, next) {
        var Vote = VoteResult.app.models.Vote;
        var WeChatUser = VoteResult.app.models.WeChatUser;
        findOne(VoteResult, {where: {weChatUid: ctx.instance.weChatUid, voteId: ctx.instance.voteId}})
        .then(function(voteResult) {
            if(voteResult === null) {
                return findOne(Vote, { where: { id: ctx.instance.voteId }});
            }
            else {
                next({'status': '400', 'message': '已经投过票了'});
            }
        })
        .then(function(vote) {
            if(vote.startTime <= new Date() && vote.stopTime >= new Date()) {
                if(ctx.instance.results.length <= vote.maxVote) {
                    return findOne(WeChatUser, {where: {id: ctx.instance.weChatUid}})
                                .then(function(weChatUser) {
                                    return Q.fcall(function() {
                                        return [vote, weChatUser];
                                    });
                                });
                }
                else {
                    next({'status': '400', 'message': '超过最大投票数'});
                }
            }
            else{
                next({'status': '400', 'message': vote.startTime > new Date()?'还未开始': '已经结束'});
            }
        })
        .then(function(data) {
            var vote = data[0];
            var weChatUser = data[1];
            switch(vote.verifyRule){
                case 'studentId':
                    if(weChatUser.studentId) {
                        return findOne(VoteResult, {where: {weChatUid: ctx.instance.weChatUid, studentId: weChatUser.studentId}});
                    }
                    else {
                        next({'status': '400', 'message': '需要绑定学号'});
                    }
                    break;
                default:
                    return findOne(VoteResult, {where: {weChatUid: ctx.instance.weChatUid, verifyResult: ctx.instance.verifyResult}});
                    break;
            }
        })
        .then(function(voteResult) {
            if(voteResult) {
                next({'status': '400', 'message': '已经投过票'});
            }else {
                next();
            }
        })
        .fail(function(err) {
            next(err);
        });
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
