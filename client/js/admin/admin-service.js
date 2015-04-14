//将公共部分写成service依赖注入，而非现在的重复变量
app.service('etuanAdmin',function(){
  return {
    //中英对照表，用于将指定的词进行翻译
    dict:{
      activity:'活动',
      form: '表单',
      seckill: '疯抢',
      vote: '投票'
    },
    //包含了所有时间格式中所需要的参数
    datetime:{
      enFormat:"EEE MMM dd yyyy HH:mm:ss 'GMT'Z '(CST)'",
      cnFormat:"yyyy'年'MM'月'dd'日 'HH'时'mm'分'",
      unFormat:"yyyy-MM-dd HH:mm",  
      cnDateFormat:"yyyy'年'M'月'd'日",
    },
    /*  在item.infoProperty中定义了所有需要编辑的功能的但页面编辑时所调用的接口名（字符串类型）
    *  其中:userId用于占位用户的ID，fk为外键，占位具体页面的ID
    *  以infoProperty[功能类型]的方式进行调用
    *  在resultProperty中定义了所有活动的接口
    */
    item:{
      infoProperty:{
        activity:'/api/OrganizationUsers/:userId/activities/:fk',
        form:'/api/OrganizationUsers/:userId/forms/:fk',
        seckill:'/api/OrganizationUsers/:userId/seckills/:fk',
        vote:'/api/OrganizationUsers/:userId/votes/:fk'
      },
      resultProperty:{
        activity:'',
        form:'/api/Forms/:id/results',
        seckill:'',
        vote:'/api/Votes/:id/subitems'
      }
    }
  };
})