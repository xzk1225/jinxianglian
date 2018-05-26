// pages/mail/index.js
import reques from '../../utils/reques.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[
    {a:'A',name:'志开'}
  ],
  a:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    let that=this;
    reques.getdata({ data: 'user/search' }, { access_token:token,type:1}).then(res=>{
      var array =res.data.result;
      var resultArray = array.sort(
        function compareFunction(param1, param2) {
          return param1.localeCompare(param2, "zh");
        }
      );
      that.setData({
        // list:resultArray
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
  delete:function(){
    console.log(1)
  }
})