// pages/my/page/message.js
import reques from '../../../utils/reques.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  formSubmit:function(e){
    
    reques.getdata({ data: 'public/submitFeedBack' }, {access_token: wx.getStorageSync('token'), content: this.data.value, ids:0}).then(res=>{
      console.log(res)
      if(res.data.code==1000){
        wx.navigateBack({
          delta: 1
        })
      }
    })
   
  },
  blur:function(e){
    this.setData({
      value:e.detail.value
    })
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
  
  }
})