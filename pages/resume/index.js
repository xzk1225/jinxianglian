// pages/indexx/page/zhiwei.js
import reques from '../../utils/reques.js'
let app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p:1,
    cheng: false,
    citya: '北京',
    seniora: false,
    array: [
     
      {
        leix: '学历', name: 'edu', list: app.globalData.edu
      },
      {
        leix: '工作年限', list: app.globalData.work_year, name:'work_year'
      },
      {
        leix: '薪酬范围', list: app.globalData.wage, name: 'wage'
      }
    ],
    xlarr: app.globalData.edu,

    jyarr: app.globalData.work_year,

    xcarr: app.globalData.wage,
    data:{},
      list:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var data = { keyword: options.keyword,  p: this.data.p++ }
    this.setData({
      data:data,
      industry: app.globalData.hangye
    })

   this.getdata(data)
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
    console.log(this)
    console.log(e.detail.value)
    this.setData({
      checked: e.detail.value
    })
  },
  submit: function (e) {
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId });
    this.setData({
      p:1
    })
    e.detail.value.keyword = this.data.keyword;
    e.detail.value.area=this.data.area;
    e.detail.value.p=this.data.p
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      data: e.detail.value
    })
    this.getdata(this.data.data)

    this.senior();
  },
  confirm: function (e) {
    
    this.setData({
      keyword: this.search.data.val
    })
  },
  _confirmEvent: function (e) {
      
    //获取城市的总数组。
    var arr = this.city.data.region, ke = 2;
   
    this.setData({
      area: arr[ke].regid,
      citya: arr[ke].regname,
      cheng:false,
      p:1
    })
    this.confirm()
    var data = { area: this.data.area, keywords: this.data.keywords,p:this.data.p};
    this.setData({
      data:data
    })
  
    this.getdata(data)
  },
  getdata(data) {
    let token = wx.getStorageSync('token');
    Date.prototype.toLocaleString = function () {  // 时间原型修改
      return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
    };
    for (let k in data) {
      if(k=='area'){
        if (data[k] != '' && data[k]!= null){
          data.top=1;
        }else{
          data.top = 0;
        }
        break
      }
    }
    data.access_token = token;
    data.type = 2;
    let that = this;
    data.num=6;
    reques.getdata({ data: 'content/list' }, data).then(res => {

      let len = res.data.result.length
      for (var i = 0; i < len; i++) {
        let commonTime = null
        let timestamp = new Date((res.data.result[i].add_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        commonTime = timestamp.toLocaleString();
        res.data.result[i].add_time = commonTime
      }

      that.setData({
        list: res.data.result
      })
    })
  }
})