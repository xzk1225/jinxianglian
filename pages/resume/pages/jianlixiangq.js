// pages/resume/jianlixiangq.js
import reques from '../../../utils/reques.js'
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  info:{},
  xlarr: app.globalData.edu,

  jyarr: app.globalData.work_year,

  xcarr: app.globalData.wage,
  industry: app.globalData.hangye,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    Date.prototype.toLocaleString = function () {  // 时间原型修改
      return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
    };
    let that=this;
    this.setData({
      id:options.id,
      industry: app.globalData.industry,
      user_id: options.user_id
    })
    reques.getdata({ data: 'content/operation' }, { access_token: token, id: options.id, type: 1 })

    reques.getdata({ data: 'content/info' }, { access_token:token,id:options.id}).then(res=>{  //简历的信息
      that.setData({
        jl_info:res.data.result
      })
    })
    reques.getdata({ data: 'content/list' }, { type: 2, top: 1, num: 6, p: this.data.p++ }).then(res => {
      that.setData({
        list: res.data.result[0]
      })
    })


    reques.getdata({ data: 'content/info' }, { access_token: token, id: options.id }).then(res => {  //个人信息
      that.setData({
        info: res.data.result
      })
    })
// 教育经历
    reques.getdata({ data: 'user/eduList' }, { access_token: wx.getStorageSync('token'), user_id:options.user_id}).then(res=>{
      let len = res.data.result.length
      for (var i = 0; i < len; i++) {
        let commonTime = null
        let timestamp = new Date((res.data.result[i].end_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        let star = new Date((res.data.result[i].start_time) * 1000);
        let starr = null;
        commonTime = timestamp.toLocaleString();
        starr = star.toLocaleString();
        res.data.result[i].end_time = commonTime;
        res.data.result[i].start_time = starr;
      }





    that.setData({
      edulist:res.data.result
    })
    })

    // 工作经历
    reques.getdata({ data: 'user/workList' }, { access_token: wx.getStorageSync('token'), user_id: options.user_id }).then(res => {
      let len = res.data.result.length
      for (var i = 0; i < len; i++) {
        let commonTime = null
        let timestamp = new Date((res.data.result[i].end_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        let star = new Date((res.data.result[i].start_time) * 1000);
        let starr=null;
        commonTime = timestamp.toLocaleString();
        starr = star.toLocaleString();
        res.data.result[i].end_time = commonTime;
        res.data.result[i].start_time = starr;
      }


      that.setData({
        worklist: res.data.result
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
    let token = wx.getStorageSync('token');
  
    if (this.data.info.is_like) {
      var type = 3;
    } else {
      var type = 2;
    }
    console.log()
    reques.getdata({ data: 'content/operation' }, { access_token: token, id: this.data.id, type: type }).then(res => {
      console.log(res.data)
      if (res.data.code == 1000) {
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

        reques.getdata({ data: 'content/info' }, { access_token: token, id: this.data.id }).then(res => {  //简历的信息
          that.setData({
            jl_info: res.data.result
          })
        })



      }
    })
  },
  ms() {  // 投递
    let token = wx.getStorageSync('token');
  
    reques.getdata({ data: 'content/operation' }, { access_token: token, id: this.data.id, type: 4 }).then(res => {
      if (res.data.code == 1000) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})