// pages/renmai/index.js
import reques from '../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    this.setData({
      user_id: options.id
    })
    let that=this;
    reques.getdata({ data: 'user/visitor' }, { access_token: token, user_id: options.id}).then(res=>{
      
    })
   
  // 获取用户信息
    // 获取学历列表
    reques.getdata({ data: 'user/eduList' }, { access_token: token, user_id: options.id }).then(res => {
      that.setData({
        eduList: res.data.result
      })
    })

    // 获取工作列表
    reques.getdata({ data: 'user/workList' }, { access_token: token, user_id: options.id }).then(res => {
      console.log(res.data)
      that.setData({
        workList: res.data.result
      })
    })
    reques.getdata({ data: 'user/userInfo' }, { access_token: token, user_id: options.id }).then(res => {
      that.setData({
        info: res.data.result
      })
      if (res.data.result.is_friend==1){
       

      }





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
  add(e) {
    // 表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })



    reques.getdata({ data: 'user/addFriend' }, { access_token: wx.getStorageSync('token'), to_user_id: this.data.user_id }).then(res => {
      if (res.data.code) {
        wx.showToast({
          title: '申请成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
})