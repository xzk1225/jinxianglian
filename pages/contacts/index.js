// pages/contacts/index.js
import reques from '../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   search:''
  },
//  自己定义的跳转函数
jump:function(e){
  const jump =e.currentTarget.dataset.type;
 
  reques.nav('../fangke/index',{type:jump})
},

confirm: function (e) {
  console.log(this.search.data.val)
  reques.nav('../indexx/list/group', { keyword: this.search.data.val })
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
  
  }
})