// pages/indexx/page/zhiwei.js
import reques from '../../../utils/reques.js'

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p:1,
    list:[],
    cheng: false,
    citya: '北京',
    seniora: false,
    keywords:'',
    city:'',
    
    array: [
      {
        leix: '行业', name: 'industry', list: [
          '创业', '公益', '亲子', '科技', '运动'
        ]
      },
      {
       name: 'edu', leix: '学历', list: app.globalData.edu
      },
      {
        name: 'work_year', leix: '工作年限', list: app.globalData.work_year
      }
    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    
    if (options.options){
      this.setData({
        keywords: options.options
      });
    }
    let key='',that=this;
      for( var k in options){
        key=k
      }
      this.getdata({ keywords: options[key], access_token: token })
     
        
        
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
    this.city.pikerScenes()
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
    if (this.data.keywords){
      e.detail.value.keywords = this.data.keywords
      e.detail.value.city = this.data.city
    }
    this.getdata(e.detail.value)
  },
  confirm: function (e) {   // 页面上的search 组件获取 keywords
    // if (this.search.data==null){
    //   return false
    // }
    
    this.setData({
      keywords: this.search.data.val
    })

  },
  _confirmEvent:function(e){
   //获取城市的总数组。
   var arr = this.city.data.region,ke=2;
 
   this.setData({
     city: arr[ke].regid,
     citya: arr[ke].regname,
     cheng: !this.data.cheng
   })
   this.confirm()
   console.log(this.data.city)
   var data = { city:this.data.city, keywords: this.data.keywords}
   this.getdata(data)
  },
  _cancelEvent() {
    //触发取消回调
 
    this.setData({
      cheng: !this.data.cheng
    })
  },
  getdata(data){   //  得到数据
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
  data.num=6;
  data.p=this.data.p++;
    let that=this;
    reques.getdata({ data:'user/search'},data).then(res=>{
      that.setData({
        list:res.data.result
      })
    })
  }
})