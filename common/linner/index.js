// common/linner/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tjurl:{
      type:String
    },
    tj:{
      type:Boolean,
      value:false
    },
    bord:{
      type:Boolean
    },
    fontSize:{
      type:String,
    },
    yuan:{
      type:Boolean,
      value:false
    },
    text:{
      type:String,
      value:'明星推荐'
    },
    color:{
      type:String,
      value:'#2c2c2c;'
    },
    url:{
      type:String

    },
    jiantou:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      deg:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
      chang(){
        this.setData({
          deg: !this.data.deg
        })
        
      },
      tjs(){
      
        this.triggerEvent("tjs")
      }
  }
})
