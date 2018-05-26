// pages/indexx/page/zhiwei.js
let app=getApp();
import reques from '../../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cheng: false,
    citya: '北京',
    seniora: false,
    
    
    data:{},
    list:[],
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
    if (options.product_type<5){
      this.setData({
        array: app.globalData.product_type_1
      })
    } else if (options.product_type ==5){
      this.setData({
        array: app.globalData.product_type_2
      })
    }else{
      this.setData({
        array: app.globalData.product_type_3
      })
    }
    if (options.product_type){
      wx.setNavigationBarTitle({
        title: app.globalData.nav_list[options.product_type].product_type
      })
    }else{
      wx.setNavigationBarTitle({
        title: '产品'
      })
    }
   

    this.getdata({ keyword: options.keyword})



  },

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
    this.city.pikerScenes();

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
    console.log(this)
    console.log(e.detail.value)
    this.setData({
      checked: e.detail.value
    })
  },
  submit: function (e) {
    this.confirm()
    this.setData({
      p: 1
    })
    e.detail.value.area = this.data.area;
    e.detail.value.access_token = wx.getStorageSync('token');
    e.detail.value.keyword = this.data.keyword;
    e.detail.value.p = this.data.p++;
    this.setData({
      data: e.detail.value
    })
    this.getdata(e.detail.value)
    this.senior()
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })
  },
  _confirmEvent: function (e) {
    //获取城市的总数组。
    var arr = this.city.data.region, ke = 2;
    this.setData({
      area: arr[ke].regid,
      citya: arr[ke].regname,
      cheng: false,
      p: 1
    })
    this.confirm()
    var data = { city: this.data.area, keywords: this.data.keywords }
    this.setData({
      cheng: !this.data.cheng,
      seniora: false,
      data: data
    })
    this.getdata(data)
  },
  _cancelEvent() {
    //触发取消回调

    this.setData({
      cheng: !this.data.cheng
    })
  },
  confirm() {
    this.setData({
      keywords: this.search.data.val
    })
  },
  getdata: function (data) {
    for (let k in data) {
      if (k == 'area') {
        if (data[k] != '' && data[k] != null) {
          data.top = 1;
        } else {
          data.top = 0;
        }
        break
      }
    }
    data.access_token=wx.getStorageSync('token');
    data.type = 6;
    let that = this;
    data.num = 6;
    reques.getdata({ data: 'content/list' }, data).then(res => {
      console.log(res.data)
      let arr= that.data.list
      that.setData({
        list: arr.concat(res.data.result) 
      })
    })
  }
})