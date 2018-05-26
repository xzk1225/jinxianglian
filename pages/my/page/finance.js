// pages/my/page/finance.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: [
      '获取积分', '积分明细', '积分规则'
    ],
    id: 0,
    p:1,
    cate: ['后台赠送', '邀请好友', '登录', '认证', '主动加好友', '被动加好友', '信息推荐', '明星推荐']
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
  onShareAppMessage: function (res) {
  
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    } 
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
        console.log(2)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  yq:function(){
    // this.onShareAppMessage()
  },
  changId: function (e) {
    let token = wx.getStorageSync('token');
    
    var data = { access_token: token, num: 6, p: this.data.p }
    this.setData({
      id: e.currentTarget.dataset.id,
      data:data
    })
    if (e.currentTarget.dataset.id==1){
     this.getdata(data)
    }
  },
  getdata(data){
    let that=this;
    reques.getdata({ data: 'pay/accountLog' },data ).then(res=>{
      that.setData({
        list:res.data.result,
        that:that.data.p++
      })
    })
  }
})