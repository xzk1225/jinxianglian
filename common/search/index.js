// common/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    qun:{
      type:Boolean,
    },
    img_url:{
      type:String
    },
    url:{
      type: String
    },
        id:{
          type:String
        },
        typee:{
          type: String,
          value:'text'
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
  
   val:''
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
    _confirm(e){
      this.triggerEvent("confirm")
    },
    _input(e){
      console.log(e)
     this.setData({
       val:e.detail.value
     })
   
     
      this.triggerEvent("input")
    }
  }
})
