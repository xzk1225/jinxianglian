// pages/fabu/zhiwei.js
var app=getApp();
import reques from '../../utils/reques.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: 0,
    val:false,
    indexx:0,
    hangye:0,
    region: [],
    industry: '必选',
    lxarr: app.globalData.industry,
    edu: '必选',
    xlarr: app.globalData.edu,
    work_year: '必选',
    jyarr: app.globalData.work_year,
    wage: '必选',
    xcarr: app.globalData.wage,
    liangdian: [{ cont: '股票期权', check: false }, { cont: '年底双薪', check: false }, { cont: '绩效奖金', check: false}],
    tianshu: app.globalData.tianshu,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    this.setData({
      money: options.money,
      price: options.price

    })
    let that=this;
    reques.getdata({ data: 'content/price' }, { access_token:token}).then(res=>{
      
      that.setData({
        price:res.data.result
      })
    })
  this.setData({
    lxarr: app.globalData.industry,
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
  onUnload: function (e) {
   
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
  industry: function (e) {
    this.setData({
      industry: e.detail.value,
      hangye: app.globalData.hangye[e.detail.value].id
    })
  },










  leixing: function (e) {
    console.log(this.data)
  
    var str = e.currentTarget.dataset.arr   //获取类型的数组的名称
    var array = this.data[str]  //获取类型的数组
    var strin = e.currentTarget.dataset.id   //获取她的名字
    var _this = this;
 
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
  checkboxChange: function (e) {
    var str=''
    for (var k in e.detail.value){
      console.log(this.data.liangdian[e.detail.value[k]].cont)
      str += this.data.liangdian[e.detail.value[k]].cont+ '   ,  '
    }
    
    this.setData({
      advantage:str
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
  formSubmit:function(e){
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })

    e.detail.value.access_token=wx.getStorageSync('token')
    e.detail.value.edu=this.data.edu;
    e.detail.value.advantage = this.data.advantage;
    
    e.detail.value.work_year = this.data.work_year;
    e.detail.value.industry = this.data.hangye; 
    e.detail.value.wage = this.data.wage;
    e.detail.value.week = this.data.week;
    e.detail.value.district = this.data.district;
    e.detail.value.type = 1;
    reques.getdata({ data:'content/send'},e.detail.value).then(res=>{
     if(res.data.code==1000){
       wx.showToast({
         title: '发布成功',
         success:function(e){
           reques.nav('213')
         }
       })
      
     }
    })
  },
  chang(e){
    
    if (e.detail.value==1){
     
      this.setData({
        val:true
      })
    }else{
     
      this.setData({
        val: false,
        week:0
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

})