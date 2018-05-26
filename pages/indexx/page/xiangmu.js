// pages/indexx/page/zhiwei.js
const app = getApp();
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p: 1,
    cheng: false,
    citya: '北京',
    seniora: false,
    array: app.globalData.xiangmu,
    val: '',
    data: {},list:1,
    financing_typearr: ['个人', '企业'],
    catesarr: ['创业', '公益', '亲子', '科技', '运动'],
    tianshu: app.globalData.tianshu,
    wayarr: app.globalData.xiangmu[0].list,
    list:[]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata({ keyword: options.keyword})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.search = this.selectComponent("#search");
    this.city = this.selectComponent("#city");
    this.city.run()

    this.city.bindChange()
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

  },
  qiehuan: function (e) {
    console.log(e)
    this.setData({
      city: this.data.provinces[e.currentTarget.dataset.id].citys
    })
  },
  cityy: function (e) {
    this.setData({

      citya: this.data.city[e.currentTarget.dataset.id].citysName,
      cheng: !this.data.cheng
    })
  },
  chengshi: function () {  //城市的。选项
    this.city.pikerScenes()
    this.setData({
      cheng: !this.data.cheng,
      seniora: false
    })
  },
  senior: function () {    //  高级筛选  点击显示
    this.setData({
      seniora: !this.data.seniora,
      cheng: false
    })
  },


  // 单选判断
  danxuan: function (e) {
    var name = e.target.dataset.name, val = e.detail.value;
    this.setData({
      [name]: e.detail.value
    })
  },
  submit: function (e) {
    this.confirm();
    this.setData({
      p: 1
    })
    e.detail.value.p = this.data.p;
    e.detail.value.keyword = this.data.keyword;
    e.detail.value.area = this.data.area;
    this.setData({
      data: e.detail.value
    })
    this.getdata(this.data.data)
    this.senior();
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })
  },
  _confirmEvent: function (e) {
    //获取城市的总数组。
    var arr = this.city.data.region, ke = 2;

    this.setData({
      area: arr[ke].regid,
      citya: arr[ke].regname,
      cheng: !this.data.cheng,
      p: 1
    })
    this.confirm()
    var data = { area: this.data.area, keywords: this.data.keywords }
    this.setData({
      data: data
    })
    this.getdata(this.data.data)
  },
  _cancelEvent() {
    //触发取消回调

    this.setData({
      cheng: !this.data.cheng
    })
  },
  confirm: function (e) {
    let that = this;
    this.setData({
      keyword: that.search.data.val
    })

  },
  getdata(data) {
    for (let k in data) {
      if (k == 'area') {
        if (data[k] != '' && data[k] != null) {
          data.top = 1;
        } else {
          data.top = 0;
        }
       
      }
    }
    data.type = 5;
    data.access_token=wx.getStorageSync('token')
    let that = this;

    reques.getdata({ data: 'content/list' }, data).then(res => {
      let arr= that.data.list
      that.setData({
        list: arr.concat(res.data.result) 
      })
    })
  }
})