// pages/fabu/huodong.js
import reques from '../../utils/reques.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: 0,
    val: false,
    industry: '必选',
    hangye: 0,
    financing_typearr: ['个人','企业'],
    catesarr: ['创业', '公益', '亲子', '科技', '运动'],
    tianshu: app.globalData.tianshu,
    wayarr: app.globalData.xiangmu[0].list
  }, 
  industry: function (e) {
    this.setData({
      industry: e.detail.value,
      hangye: app.globalData.hangye[e.detail.value].id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      money: options.money,
      price: options.price,
      lxarr: app.globalData.industry

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.city = this.selectComponent("#city");
    this.city.run()
    this.city.bindChange()
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e)
    var str = e.target.dataset.name
    this.setData({
      [str]: e.detail.value
    })
  },
  leixing: function (e) {
    var str = e.currentTarget.dataset.arr   //获取类型的数组的名称
    var array = this.data[str]  //获取类型的数组
    var strin = e.currentTarget.dataset.id   //获取她的名字
    var _this = this
    wx.showActionSheet({
      itemList: array,
      success: function (res) {
        _this.setData({
          [strin]: res.tapIndex
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
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

  },
  bindRegionChange: function (e) {
    this.city.pikerScenes()
  },
  _confirmEvent: function (e) {
    //获取城市的总数组。
    var arr = this.city.data.region, that = this;
    for (var k in arr) {
      const str = 'region[' + k + ']'
      that.setData({
        [str]: arr[k].regname,
        province: arr[0].regid,
      })
      if (k == 2) {
        that.setData({
          district: arr[k].regid
        })
      }
    }
    that.setData({
      province: arr[0].regid,
      city: arr[1].regid,
      district: arr[2].regid,
    })

  },
  chang(e) {
    if (e.detail.value == 1) {
      this.setData({
        val: true
      })
    } else {
      this.setData({
        val: false,
        week: 0
      })
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      week: e.detail.value,
      integral: (e.detail.value + 1) * this.data.price
    })
  
  },
  formSubmit: function (e) {// 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })

    e.detail.value.access_token = wx.getStorageSync('token')
    e.detail.value.province = this.data.province;
    e.detail.value.city = this.data.city;
    e.detail.value.district = this.data.district;
    e.detail.value.industry = this.data.hangye;
    e.detail.value.way = this.data.way+1;
    e.detail.value.type = 5;
    e.detail.value.week = this.data.week;
    // e.detail.value.type = this.data.type+1;
    reques.getdata({ data: 'content/send' }, e.detail.value).then(res => {
      console.log(res.data)
      if (res.data.code == 1000) {
        reques.nav('213')
      }
    })
  },
})