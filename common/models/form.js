var PDFDocument = require('lx-pdf')('/var/www/etuan-node/common/modules/template.json');
var xlsx = require('node-xlsx');
var streamifier = require('streamifier');

module.exports = function(Form) {
  //浏览活动将浏览量加一
  Form.remoteMethod('view', {
    accepts: {arg: 'id', type: 'string'},
    http: {verb: 'GET', path: '/view/:id'}
  });

  Form.view = function(id, cb) {
    Form.update({id: id}, {$inc: {viewCount: 1}}, function(err, result) {
      cb(null);
    });
  }

  Form.beforeRemote('prototype.__updateById__results', function(ctx, instance,next) {
    if (ctx.req.body.from === 'createRM'){
      ctx.args.data = ctx.req.body.data;
      ctx.args.from = 'createRM';
      next();
    } else {
      ctx.args.data = null;
      console.log('1');
    }
  });

	Form.pdf = function(id, cb){
		cb(null);
	}

	Form.remoteMethod(
		'pdf',
		{
			accepts: {arg:'id', type:'string'},
			http: {path:'/pdf/:id',verb:'get'}
		}
	);

	Form.afterRemote('pdf',function(ctx,instance,next){
    var FormResult = Form.app.models.FormResult;
    var content = '';
    ctx.res.setHeader('Content-disposition', 'attachment; filename=' + ctx.req.params.id + '.pdf');
    try {
       FormResult.find({where:{formId:ctx.req.params.id}}, function(err, formResults){
         Form.findOne({where:{id:ctx.req.params.id}}, function(err, form){
           if(err){
             next(err);
           }else{
             for(var i=0; i<formResults.length; i++){
               var formResult = formResults[i];
               for(var j=0; j<formResult.formResultAnswers.length; j++) {
                 var formResultAnswer = formResult.formResultAnswers[j];
                 content = form.formQuestions[j].label+' : '+formResultAnswer.content;
                 //PDFDocument.addContent('content',content);
                 for (var x=0; x < parseInt(content.length/50 +1); x++) {
                   PDFDocument.addContent('content', content.substr(x*50,50));
                 }
                 PDFDocument.addContent('content','\n');
               }
               PDFDocument.resetDocumentIndices();
             }
             PDFDocument.print(function (data, err) {
               if (err) {
                  console.log(err);
               } else {
                 ctx.res.send(data);
               }
             });
           }
         });
       });
    }
    catch(e) {
       //异常处理
    }
	});

  Form.excel = function(id, cb){
    cb(null);
  }

  Form.remoteMethod(
    'excel',
    {
      accepts: {arg:'id', type:'string'},
      http: {path:'/excel/:id',verb:'get'}
    }
  );

  Form.afterRemote('excel',function(ctx,instance,next){
    ctx.res.setHeader('Content-disposition', 'attachment; filename=' + ctx.req.params.id + '.xls');
    var FormResult = Form.app.models.FormResult;
    FormResult.find({where:{formId:ctx.req.params.id}}, function(err, formResults){

      Form.findOne({where:{id:ctx.req.params.id}}, function(err, form){
        if(err){
          next(err);
        }else{
          try {
            var data = [];
            var formQuestions = [];
            for(var i=0; i<form.formQuestions.length; i++){
              formQuestions.push(form.formQuestions[i].label);
            }
            data.push(formQuestions);

            for(var i=0; i<formResults.length; i++){
              var formResult = formResults[i];
              var formResultAnswerArr = [];
              for(var j=0; j<formResult.formResultAnswers.length; j++) {
                var formResultAnswer = formResult.formResultAnswers[j].content;
                formResultAnswerArr.push(formResultAnswer);
              }
              data.push(formResultAnswerArr);
            }
            var buffer = xlsx.build([{name: "报名结果", data: data}]); // returns a buffer
            streamifier.createReadStream(buffer).pipe(ctx.res);
          }
          catch(e) {
            //异常处理
          }
        }
      });
    });
  });
};
