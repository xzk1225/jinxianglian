// pages/indexx/page/zhiwei_index.js
import reques from '../../../utils/reques.js'
var app = getApp()
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
    circular:true,
    lxarr: app.globalData.industry,
    edu: '必选',
    xlarr: app.globalData.edu,
    work_year: '必选',
    jyarr: app.globalData.work_year,
    wage: '必选',
    xcarr: app.globalData.wage,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    reques.getdata({ data: 'content/list' }, { access_token: wx.getStorageSync('token'),top:1,type:1}).then(res=>{

this.setData({
  industry: app.globalData.industry,
})
      Date.prototype.toLocaleString = function () {  // 时间原型修改
        return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
      };
      let len = res.data.result.length
      for (var i = 0; i < len; i++) {
        let commonTime = null
        let timestamp = new Date((res.data.result[i].add_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        commonTime = timestamp.toLocaleString();
        res.data.result[i].add_time = commonTime
        console.log(commonTime)
      }
      that.setData({
        list:res.data.result
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
  confirm: function (e) {
    console.log(this.search.data.val)
    reques.nav('./zhiwei', { keyword: this.search.data.val})
  }
})