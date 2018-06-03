// pages/indexx/index.js
var app=getApp();
import reques from '../../utils/reques.js'

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    a:[
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 0
    },
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
    },
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
    },
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
    },
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
    },
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 0
    },
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
    },
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
    },
    {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资'
    }
    ],

  
    group:true,  //  这个状态控制是否显示群组 的模块状态。
    indicatorDots: true,
    autoplay: true,
    interval: 3000, //  这里控制轮播的快慢。
    duration: 1000, //  轮播的动画
    circular: true,
    text:'这是一条公告信息',  //  公告信息。加载页面的时候更改。
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 24,
    orientation: 'left',//滚动方向
    intervals: 20 // 时间间隔
  },
  formSubmit(e){
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  

  onLoad: function (options) {
   

  try{
    var token = wx.getStorageSync('token');
  if(!token){
   app._login()
    token = wx.getStorageSync('token');
    console.log(wx.getStorageSync('token'));
    this.getdata()
  }else{
    this.getdata()
  }
  var that = this;
  reques.getdata({ data: 'public/ads' }, { position: 1 }).then(res => {  //  轮播图
  if(!res.data.result.length<1){
    that.setData({
      imgUrls: res.data.result
    })
  }
   
  })
  reques.getdata({ data: 'public/industries' }).then(res => {   // 行业
   
  
    app.globalData.hangye = res.data.result  //  行业的总数据。
    app.globalData.industry = res.data.result  //  行业的列表。
    var arr = res.data.result, newarr = [];
 
    for (var key in arr) {
      newarr.push(arr[key].name)
    }
    app.globalData.industry = newarr  //  行业的列表。
  })
  // this.getdata()
  }catch(e){
    console.log(e)
  }
   
  

  },
getdata(){
  var lat = '', lon = '', data = {},that=this;
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      lat = res.latitude
      lon = res.longitude
      data = { access_token: wx.getStorageSync('token'), type: 2, lat: lat, lon: lon };
      reques.getdata({ data: 'user/search' }, data).then(res => {  // 附近的人。
        that.setData({
          list: res.data.result
        })
      
      });

    // 获取用户详情
      reques.getdata({ data: 'user/userInfo' }, { access_token: wx.getStorageSync('token'), user_id:0}).then(res => {  // 附近的人。
        that.setData({
          cert: res.data.result.cert
        })
      });
      reques.getdata({ data: 'group/list' }, { access_token: wx.getStorageSync('token'), type: 0, num: 6, p: 1 }).then(res => {// 推荐的群组。
        that.setData({
          group_list: res.data.result
        })
      });
    }
  });
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
  add:function(){
    // reques.getdata({ data: 'user/addFriend' }, { access_token: wx.getStorageSync('token'), to_user_id:})
   console.log(11111111)
  },
  jump:function(e){
   
    reques.nav('./xiangqing/group', { id: e.currentTarget.dataset.id, no:true})
  }
})
