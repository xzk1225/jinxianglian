// pages/my/page/jianli.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:[
      '我的简历', '投递记录','会员收藏'
    ],
    id:0,
    arr:[   
     
      { position: 'wwww', gs: '北京',time: '2055-88-88' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    reques.getdata({ data: 'content/list' }, { access_token:wx.getStorageSync('token'),type:2,cate:1}).then(res=>{
      that.setData({
        jl_info:res.data.result[0]
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
  changId:function(e){
    let token = wx.getStorageSync('token');
    
    this.setData({
      id:e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id == 0) {
      // this.setData({
      //   data: { access_token: token, type: 1, p: this.data.p, cate: this.data.cate, num: 20, user_id: 0 }
      // })
      // this.getdata(this.data.data)
    } else if (e.currentTarget.dataset.id == 1) {
      this.setData({
        data: { access_token: token, type: 2, p: this.data.p++, num: 10 }
      });
      this.jl_list(this.data.data)
    } else {
      this.setData({
        data: { access_token: token, type: 2, p: this.data.p++, num: 10 }
      });
      this.like(this.data.data)
    }



  },
  // 收到的简历
  jl_list(data) {
    let that = this;

    reques.getdata({ data: 'content/joinMyList' }, data).then(res => {
      that.setData({
        list: res.data.result
      })
    })
  },
  like(data) {
    let that = this;
    reques.getdata({ data: 'content/likeMyList' }, data).then(res => {
      that.setData({
        list: res.data.result
      })
    })

  },
})