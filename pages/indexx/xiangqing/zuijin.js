// pages/indexx/xiangqing/zuijin.js
import reques from '../../../utils/reques.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  p:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
     const data = { access_token: token, id: options.id, num: 10, p: this.data.p++ }
    this.getdata(this.data.data)
    
  },
  getdata(data){
    let that=this;
    const arr=this.data.list;
    reques.getdata({ data: 'content/viewlist' }, data).then(res => {
   
    that.setData({
        list: arr.concat(res.data.reslut)
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
    this.getdata(this.data.data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})