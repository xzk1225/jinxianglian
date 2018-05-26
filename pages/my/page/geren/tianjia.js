// pages/my/page/geren/tianjia.js
import reques from '../../../../utils/reques.js'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    type:'text',
    disabled:true,
    text:'获取验证码',
    display:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    
    var name = app.globalData.userInfo  // 获取需要改变的变量
    var parameter = options[name]
   this.setData({
    //  str: options[name]
     str: parameter
   })

   if(name=='phone'){
     this.setData({
       //  str: options[name]
       display: true
     })

   }
    // app.globalData.input=
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  code(e){
    let that=this;
  // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId})

    reques.getdata({ data: 'auth/code' }, { phone: this.data.str, type: 1, app_id: wx.getStorageSync('token')}).then(res=>{
      if(res.data.code==1000){
        wx.showToast({
          title:'发送成功' ,
        });
        that.setData({
          disabled: true
        })
        var i=59;
        var time=setInterval(function(){
            that.setData({
              text: i+'秒再次获取'
          })
          i--
            if(i==0){
              clearInterval(time);
              that.setData({
                text: '获取验证码',
                disabled:false  
              })
            }
        },1000)
      }
    })
  },
  changee: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  cheng:function(e){
    this.setData({
      str: e.detail.value
    })
   

    if (this.check()){
        this.setData({
          disabled:false
        })
    }
    app.globalData.input = e.detail.value
 
  
  },
  done:function(){
    const token = wx.getStorageSync('token');
    var name=app.globalData.userInfo,that=this;
    if (name=='phone' ){
  // 这里需要一个新的接口
      reques.getdata({
        data: 'auth/bindPhone'
      }, { access_token: wx.getStorageSync('token'), phone: this.data.str, code:this.data.code}).then(res=>{
        if(res.data.code==1000){
          wx.showToast({
            title: '绑定成功',
            success:function(){
              reques.nav('sss')
            }
          })
        }
      })



  }else{

  if(this.check()){
    reques.getdata({ data: 'user/updateUserInfo' }, { access_token: token, [name]: this.data.str }).then(res => {
      if (res.data.code == 1000) {
        reques.nav('w')
      }
    })
  }else{
    wx.showToast({
      title: '请正确输入',
      icon: 'none',
      duration: 2000
    })
  }
  }
  },
  check:function(){
    var val = app.globalData.userInfo,
          that=this,
          reg='';

    switch (val){
      case 'user_nick':
         reg = /^[\u4E00-\u9FA5]{2,4}$/;

        if (!reg.test(that.data.str)) {
              return false
          } else {
            return true
          }
        break;
      case 'phone':
        reg = /^[1][3,4,5,7,8][0-9]{9}$/; 

        if (!reg.test(that.data.str)) {
          return false
        } else {
          return true
        }
        break;
        case 'mail':
        reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

        if (!reg.test(that.data.str)) {
          return false
        } else {
          return true
        }
        break;
        default:
        return true
    }
  }
})