// pages/fabu/jianli.js
let app= getApp();
import reques from '../../utils/reques.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hangye: 0,
    val: false,
    wage:'必选',
    wagearr: app.globalData.wage,
    industry: '必选',
    lxarr: app.globalData.industry,
    edu: '必选',
    eduarr: app.globalData.edu,
    work_year: '必选',
    jyarr: app.globalData.work_year,
    tianshu: app.globalData.tianshu,
    integral:0
   
  },
  industry: function (e) {  // 行业选择
    this.setData({
      industry: e.detail.value,
      hangye: app.globalData.hangye[e.detail.value].id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
    this.setData({
      money: options.money,
      lxarr: app.globalData.industry,
      price: options.price

    })
    
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      week: e.detail.value,
      integral: (e.detail.value + 1) * this.data.price
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.getdata()
  },

  getdata(){
    let token = wx.getStorageSync('token');

    let that=this;
    reques.getdata({ data: 'user/workList' }, { access_token: token, user_id:0}).then(res=>{
    that.setData({
      workList:res.data.result
    })
    })

    reques.getdata({ data: 'user/eduList' }, { access_token: token, user_id: 0 }).then(res => {
      that.setData({
        eduList: res.data.result
      })
    })

    // 获取标签
    reques.getdata({ data: 'user/getTags' }, { access_token: token, user_id:0}).then(res=>{
      console.log(res.data)
      that.setData({
        tags: res.data.result
      })
    })
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
  bindRegionChange: function (e) {
    this.city.pikerScenes()
  },
  _confirmEvent: function (e) {
    //获取城市的总数组。
    var arr = this.city.data.region, that = this;
    for (var k in arr) {
      const str = 'region[' + k + ']'
      that.setData({
        [str]: arr[k].regname
      })
      if (k == 2) {
        that.setData({
          district: arr[k].regid
        })
      }
    }

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
  formSubmit(e){
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })

    e.detail.value.access_token = wx.getStorageSync('token');
    e.detail.value.week = this.data.week;
    e.detail.value.district = this.data.district;
    e.detail.value.industry = this.data.hangye;
    e.detail.value.type = 2;
    e.detail.value.work_year = this.data.work_year;
    e.detail.value.edu = this.data.edu;
    e.detail.value.wage = this.data.wage;

    console.log(e.detail.value)
    reques.getdata({ data: 'content/send' }, e.detail.value).then(res => {
      console.log(res.data)
      if (res.data.code == 1000) {
        reques.nav('213')
      }
    })
   
   
  }
})