// common/details/index.js
import reques from '../../utils/reques.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
   me:{
    type:Boolean
   },
   distance:{
     type:Boolean,
     value:false
   },
//     friend:{
//       type:Boolean
//     },
//   url:{
//     type:String,
//     value:'/images/link.jpg'
//   },
//   name:{
//   type:String,
//   value:'墨子'
//   },
 a:{
   type:Boolean
 },
 hy:{
   type:String
 },
//   time:{
//     type:String,
//     value:'2018-3-7'
//   },
//   company:{
//     type:String,
//     value:'北京是一个好地方'
//   },
//   position:{
//     type:String,
//     value:'这是一个职位信息'
//   },
 
//   region:{
//     type:String,
//     value:'我的家乡在东北'
//   },
//   hometown:{
//     type:String,
//     value:'河北省沙河市'
//   },
//   field:{
//     type:String,
//     value:'金融'
//   },
//   friends:{
//     type:Number,
//     value:2
//   },
//   list:{
//     type:Array,
//     value: ['/images/link.jpg', '/images/link.jpg', '/images/link.jpg', '/images/link.jpg', '/images/link.jpg', '/images/link.jpg', '/images/link.jpg', '/images/link.jpg', '/images/link.jpg', '/images/link.jpg']
//   }

info:{
  type: Object
}

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _add(e){
      console.log(this.data.info.friend)
      const token = wx.getStorageSync('token')
      this.triggerEvent("add")
      if (this.data.info.friend) {
        
        reques.getdata({ data: 'user/delFriend' }, { access_token:token, to_user_id: e.currentTarget.dataset.hy }).then(res => {
          if (res.data.code) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }else{
        reques.getdata({ data: 'user/addFriend' }, { access_token:token, to_user_id: e.currentTarget.dataset.hy }).then(res => {
          if (res.data.code) {
            wx.showToast({
              title: '申请成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
      
      
    }
  }
})
