//将公共部分写成service依赖注入，实现模块化，摆脱controller
app.service('etuanAdmin',function(){
  return {
    //在这包含和社团组织相关的信息，主要用于设置当中，如果需要其他组件需要也可以直接注入
    org:{
      types:['校级社团','校级组织','院级社团','院级组织'],
      schools:[
        '机械工程学院','电子信息学院','通信工程学院','自动化学院','计算机学院',
        '生命信息与仪器工程学院','材料与环境工程学院','软件工程学院','理学院',
        '经济学院','管理学院','会计学院','外国语学院','数字媒体与艺术设计学院',
        '人文与法学院','马克思主义学院','卓越学院','信息工程学院','国际教育学院','继续教育学院'
      ],
      universities:['杭州电子科技大学']
    },
    //中英对照表，用于将指定的词进行翻译
    dict:{
      activity:'活动',
      form: '表单',
      seckill: '疯抢',
      vote: '投票'
    },
    //包含了editor的配置项
    editor:{
      config:{
        toolbars:[[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'simpleupload', 'insertimage',
        ]],
        initialFrameHeight:300,
        //关闭字数统计
        wordCount:false,
        //关闭elementPath
        elementPathEnabled:false
      }
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
      },
      resultDownloadType:{
        activity:{
          downloadAsExcel:false,
          downloadAsPdf:false
        },
        form:{
          downloadAsExcel:true,
          downloadAsPdf:true
        },
        seckill:{
          downloadAsExcel:true,
          downloadAsPdf:false
        },
        vote:{
          downloadAsExcel:true,
          downloadAsPdf:false
        }
      }
    }
  };
})