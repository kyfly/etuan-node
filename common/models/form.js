var PDFDocument = require('pdfkit');
var xlsx = require('node-xlsx');
var streamifier = require('streamifier');

module.exports = function(Form) {
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
    var WeChatUser = Form.app.models.WeChatUser;
    var doc = new PDFDocument();
    doc.pipe(ctx.res);
    ctx.res.setHeader('Content-disposition', 'attachment; filename=' + 'result.pdf');
    try {
      FormResult.find({where:{formId:ctx.req.params.id}}, function(err, formResults){
        Form.findOne({where:{id:ctx.req.params.id}}, function(err, form){
          if(err){
            next(err);
            doc.end();
          }else{
            for(var i=0; i<formResults.length; i++){
              var formResult = formResults[i];
              for(var j=0; j<formResult.formResultAnswers.length; j++) {
                var formResultAnswer = formResult.formResultAnswers[j];
                console.log(__dirname);
                doc.font('../../client/fonts/font.ttf').text(form.formQuestions[j].label+':', 100, 100*(j+1));
                doc.font('../../client/fonts/font.ttf').text(formResultAnswer.content, 100, 100*(j+1));
              }
            }
            doc.end();
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
    ctx.res.setHeader('Content-disposition', 'attachment; filename=' + 'result.xls');
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
