// pages/indexx/xiangqing/xiangmu.js
import reques from '../../../../utils/reques.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_typearr: ['信托', '资管', '基金', 'P2P', '保险', '贷款'],
    domainarr: ['房地产', '金融市场', '基础设施', '工商企业', '其他'],
    invest_deadlinearr: ['2个月以下', '2个月- 12个月', '12个月- 24个月', '24个月- 36个月', '36以上'],
    earningsarr: ['7%以内', '7% -8 %', '8% -9 % ', '9% -10 %', '10% 以上', '浮动'],
    wayarr: ['7%按月付息', '按季付息', '按半年付息', '按年付息', '到期付本息'],
    sizearr: ['1000万以内', '1000万- 5000万', '5000万- 1亿', '1亿- 5亿', '5亿以上'],
    agearr: ['0- 17周岁', '18-65周岁', '66周岁以上'],
    security_deadlinearr: ['7%2周以内以内', '2周- 3个月', '3个月- 1年 ', '1年- 5年', '5年- 10年', '10年- 30年', '30年以上', '终生'],
    security_typearr: ['成人保险', '儿童保险', '中老年保险', '旅游出行', '交通安全', '房屋财产', '汽车保险'],
    bzqxarr: ['7%2周以内以内', '2周- 3个月', '3个月- 1年 ', '1年- 5年', '5年- 10年', '10年- 30年', '30年以上', '终生'],
    loan_typearr: ['信用贷款', '房产贷款', '汽车贷款', '企业贷款', '应急贷款', '信用卡', '其他'],
    loan_deadlinearr: ['随借随还', '1- 6月', '6-12月', '1年- 3年', '三年以上'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    wx.setTopBarText({
      text: options.product_type
    })
    this.setData({
      id: options.id,
      user_id: options.user_id
    })
    // 获取信息详情
    reques.getdata({ data: 'content/operation' }, { access_token: token, id: options.id, type: 1 })

    let that = this;
    reques.getdata({ data: 'content/info' }, { access_token: token, id: options.id }).then(res => {
      that.setData({
        info: res.data.result
      })
    })

    // 获取 最近访客
    reques.getdata({ data: 'content/viewlist' }, { access_token: token, id: options.id }).then(res => {
      that.setData({
        photo: res.data.result
      })
    })
    // 获取 职位发布人信息
    reques.getdata({ data: 'user/userInfo' }, { access_token: token, id: options.id }).then(res => {
      that.setData({
        userInfo: res.data.result
      })
    })
    // 获取她发的其它职位
    reques.getdata({ data: 'content/list' }, { access_token: token, user_id: options.id, type: 3 }).then(res => {
      that.setData({
        zwlist: res.data.result[0]
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
  sc() {  //  收藏
    let token = wx.getStorageSync('token'),that=this;
    if (this.data.info.is_like) {
      var type = 3;
    } else {
      var type = 2;
    }
    reques.getdata({ data: 'content/operation' }, { access_token: token, id: this.data.id, type: type }).then(res => {

      if (res.data.code == 1000) {
        reques.getdata({ data: 'content/info' }, { access_token: token, id: that.data.id }).then(res => {
          that.setData({
            info: res.data.result
          })
        })


        if (type == 2) {


          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '取消收藏',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  td() {  // 投递
    let token = wx.getStorageSync('token');
    reques.getdata({ data: 'content/operation' }, { access_token: token, id: this.data.id, type: 6 }).then(res => {
      if (res.data.code == 1000) {
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})