// pages/fabu/obj.js
import reques from '../../utils/reques.js'
let app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: 0,
    tianshu: app.globalData.tianshu,
  region: ['广东省', '广州市', '海珠区'],
  val:false,
      id:0,
      product_typearr: ['信托', '资管', '基金', 'P2P', '保险', '贷款'],
      domainarr: ['房地产', '金融市场', '基础设施', '工商企业', '其他'],
      invest_deadlinearr: ['2个月以下', '2个月- 12个月', '12个月- 24个月', '24个月- 36个月', '36以上'],
      earningsarr: ['7%以内', '7% -8 %', '8% -9 % ', '9% -10 %', '10% 以上', '浮动'],
      wayarr: ['7%按月付息', '按季付息', '按半年付息', '按年付息', '到期付本息'],
      sizearr: ['1000万以内', '1000万- 5000万', '5000万- 1亿', '1亿- 5亿', '5亿以上'],
      agearr: ['0- 17周岁', '18-65周岁', '66周岁以上'],
      security_deadlinearr: ['7%2周以内以内', '2周- 3个月', '3个月- 1年 ', '1年- 5年', '5年- 10年', '10年- 30年', '30年以上', '终生'],
      security_typearr:['成人保险', '儿童保险', '中老年保险', '旅游出行', '交通安全', '房屋财产','汽车保险'],
      bzqxarr: [ '7%2周以内以内', '2周- 3个月', '3个月- 1年 ', '1年- 5年', '5年- 10年', '10年- 30年', '30年以上', '终生'],
      loan_typearr: ['信用贷款', '房产贷款', '汽车贷款', '企业贷款', '应急贷款', '信用卡', '其他'], 
      loan_deadlinearr: ['随借随还', '1- 6月', '6-12月', '1年- 3年', '三年以上'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    money: options.money,
    price: options.price
    
  })
  },
  daikuan(e){
    console.log(e)
  this.setData({
    loan_type:e.detail.value
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
  bindPickerChange(e){
    console.log('picker发送选择改变，携带值为', e)
    var str=e.currentTarget.dataset.id
    this.setData({
      [str]: e.detail.value
    })
    if(str=='week'){
      this.setData({
        integral: (e.detail.value+1) * this.data.price
      })
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  leixing:function(e){
    var str = e.currentTarget.dataset.arr
    var array =this.data[str]
    var strin = e.currentTarget.dataset.id
    var _this=this
    wx.showActionSheet({
      itemList: array,
      success: function (res) {
        if (strin =='product_type'){
          if (res.tapIndex>3){
            _this.setData({
              id: res.tapIndex
          })
          }else{
            _this.setData({
              id: res.tapIndex
            })
          }
        }
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
     
    }
   
      that.setData({
        district: arr[2].regid
      })
   
  },
  formSubmit:function(e){
      e.detail.value.size = this.data.size+1,
      e.detail.value.invest_deadline = this.data.invest_deadline+1;
      e.detail.value.way = this.data.way+1;
      e.detail.value.age = this.data.age+1 ;
      e.detail.value.security_deadline = this.data.security_deadline+1;
      e.detail.value.loan_type = this.data.loan_type+1 ;
      e.detail.value.loan_deadline = this.data.loan_deadline+1 ;
    e.detail.value.product_type = this.data.product_type+1;
    e.detail.value.domain = this.data.domain+1;
    e.detail.value.district = this.data.district;
    e.detail.value.week = this.data.week;
    e.detail.value.type =6;
    e.detail.value.access_token = wx.getStorageSync('token');
    reques.getdata({ data: 'content/send' }, e.detail.value).then(res=>{
      console.log(res.data)
      if(res.data.code==1000){
        reques.nav('we')
      }
    })
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })


  }
})