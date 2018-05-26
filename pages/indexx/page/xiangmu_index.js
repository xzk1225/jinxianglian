// pages/indexx/page/zijin_index.js
import reques from '../../../utils/reques.js'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    list:[{id:12}],
    financing_typearr: ['个人', '企业'],
    catesarr: ['创业', '公益', '亲子', '科技', '运动'],
    tianshu: app.globalData.tianshu,
    wayarr: app.globalData.xiangmu[0].list
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    reques.getdata({ data: 'content/list' }, { type: 5, top: 1, access_token:wx.getStorageSync('token') }).then(res => {
      that.setData({
        list: res.data.result
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.search = this.selectComponent("#search");
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
  confirm: function () {
    reques.nav('./xiangmu', { keyword: this.search.data.val })
  }
})