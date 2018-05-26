// pages/resume/jianli.js
let app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // post:{
    //   type:String,
    //   value:'主管'
    // },
    // dizhi: {
    //   type: String,
    //   value: '北京'
    // },
    // sex: {
    //   type: Boolean,
    //   value: false
    // },
    // xueli: {
    //   type: String,
    //   value: '大专'
    // },
    // jingyan: {
    //   type: String,
    //   value: '1年'
    // },
    // time:{
    //   type: String,
    //   value: '2012-08-88'
    // }
    info:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    xlarr: app.globalData.edu,

    jyarr: app.globalData.work_year,

    xcarr: app.globalData.wage,
    industry: app.globalData.hangye,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
