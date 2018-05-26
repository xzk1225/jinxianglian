// pages/star/index.js
import reques from '../../utils/reques.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      { name: 123123, id: 121 }, { name: 123123, id: 121 }, { name: 123123, id: 121 }, { name: 123123, id: 121 }, { name: 123123, id: 121 }
    ],
    id:0,
    p:1,
    list:[],
    area:'',
    district:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    var lat=null,lon=null,data=null;
    let that=this;
    reques.getdata({ data:'public/starplates'}).then(res=>{
      console.log(res.data)
      that.setData({
        array:res.data.result
      })
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
       
        lat = res.latitude
        lon = res.longitude
        data = { access_token: wx.getStorageSync('token'), lat: lat, lon: lon };
        reques.getdata({ data: 'public/nowAreas' }, data).then(res => {  // 当前的城市id。
          let area = res.data.result.area;
         that.setData({
           district:res.data.result.area
         })
   
        }).then(res=>{
        
          reques.getdata({ data: "user/starList" }, { access_token: token, plate_id: that.data.array[0].id, num: 10, p: that.data.p++, district: that.data.district })
            .then(res => {
              console.log(res.data)
              that.setData({
                list: res.data.result
              })
            })
        })
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
    const token = wx.getStorageSync('token');
    
    let that=this;
    reques.getdata({ data: "user/starList" }, { access_token: token, plate_id: this.data.id, num: 10, p: this.data.p += 10, district: that.data.district })
      .then(res => {
    var arr=that.data.list.concat(res.data.result)
        that.setData({
          list: arr
        })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  changColor(e){
    const token = wx.getStorageSync('token');
    
    let that=this;
    this.setData({
      id: e.currentTarget.dataset.index,
     p:1
    });
    reques.getdata({ data: "user/starList" }, { access_token: token, plate_id: e.currentTarget.dataset.id, num: 10, p: this.data.p++, district: this.data.district}).then(res=>{
      that.setData({
        list:res.data.result
      })
      console.log(res.data)
    });






  //   then(res=>{
  //  console.log(res.data)
  //      that.setData({
  //        list: res.data.result
  //      })
  //   })
  }
})