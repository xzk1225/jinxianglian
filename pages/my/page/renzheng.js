// pages/my/page/renzheng.js
import reques from '../../../utils/reques.js'
var tempFilePaths=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      let token = wx.getStorageSync('token')
      const that = this;
      reques.getdata({ data: 'user/userInfo' }, { access_token: token }).then(res => {
        console.log(res.data)
        that.setData({
          info: res.data.result
        })
      })
   
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
 
  upload: function () {
   
    
    var ths = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePaths = res.tempFilePaths
        ths.setData({
          avatar: tempFilePaths
        })
      }
    })
  },
  submit(){
    let token = wx.getStorageSync('token');
    console.log(tempFilePaths[0])
    reques.imgdata('user/cert', tempFilePaths[0], { access_token: token }, 'img').then(res => {
      let data = JSON.parse(res.data)
      console.log(data.code == 1000)
      
      if (data.code == 1000) {
        wx.showToast({
          title: '提交成功',
          mask:true,
          duration:2000,
          complete:function(){
            
          },
        })
        setTimeout(function(){
          reques.nav('sss')
        },1000)
       
      }
    })
   
  }
})