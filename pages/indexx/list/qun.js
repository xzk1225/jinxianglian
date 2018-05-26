// pages/indexx/page/zhiwei.js
import reques from '../../../utils/reques.js'
var area = require('../../../utils/area.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    cheng: false,
    citya: '北京',
    seniora: false,
    keywords: '',
    city: '',

    array: [
      {
        leix: '行业', name: 'industry', list: [
          '创业', '公益', '亲子', '科技', '运动'
        ]
      }
      // {
      //   name: 'edu', leix: '学历', list: app.globalData.edu
      // },
      // {
      //   name: 'work_year', leix: '工作年限', list: app.globalData.work_year
      // }
    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   


    let token = wx.getStorageSync('token');
    
   
    this.getdata({ name: options.keywords, access_token: token,type: 0 })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.search = this.selectComponent("#search");
    this.city = this.selectComponent("#city");

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

  chengshi: function () {  //城市的。选项

    this.setData({
      cheng: !this.data.cheng,
      seniora: false
    });
    this.city.run()
    this.city.pikerScenes()
    this.city.bindChange()
  },
  senior: function () {    //  高级筛选  点击显示
    this.setData({
      seniora: !this.data.seniora,
      cheng: false
    })
  },


  // 单选判断
  danxuan: function (e) {
    console.log(this)
    console.log(e.detail.value)
    this.setData({
      checked: e.detail.value
    })
  },
  submit: function (e) {
    this.confirm();
    if (this.data.keywords) {
      e.detail.value.keywords = this.data.keywords
      e.detail.value.city = this.data.city
    }

    this.getdata(e.detail.value)
  },
  confirm: function (e) {   // 页面上的search 组件获取 keywords
    // if (this.search.data==null){
    //   return false
    // }
    console.log(this.search)
    this.setData({
      keywords: this.search.data.val
    })

  },
  _confirmEvent: function (e) {
    //获取城市的总数组。
    var arr = this.city.data.region, ke = 0;
    for (var k in arr) {
      if (arr[k].regid == -1) {
        ke = k;
        break
      }
    }
    this.setData({
      city: arr[ke - 1].regid,
      citya: arr[ke - 1].regname,
      cheng: !this.data.cheng
    })
    this.confirm()
    var data = { city: this.data.city, keywords: this.data.keywords }
    this.getdata(data)
  },
  _cancelEvent() {
    //触发取消回调

    this.setData({
      cheng: !this.data.cheng
    })
  },
  getdata(data) {   //  得到数据
    let that = this;
    // reques.getdata({ data: 'user/search' }, data).then(res => {
    //   that.setData({
    //     list: res.data.result
    //   })
    // })
    reques.getdata({ data: 'group/list' }, data).then(res => {
      that.setData({
        list: res.data.result
      })
    })


  }
})