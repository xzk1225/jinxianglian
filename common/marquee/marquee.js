// common/marquee/marquee.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  text:{
    type:String,
    value:'公告'
  },
  size:{
    type:Number,
   
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
   
    orientation: 'left',//滚动方向
    interval: 20 // 时间间隔
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
