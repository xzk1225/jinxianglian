// pages/contacts/group/add_group.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{ user_id: 1 }, { user_id: 2 }, { user_id: 2 },{ user_id: 22 },5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    
    let that=this;
    reques.getdata({ data: 'user/search' }, { access_token: token, type:1})
    .then(res=>{
      that.setData({
        items:res.data.result
      })
    })
  },
  formSubmit:function(e){
    let token = wx.getStorageSync('token');
    
    reques.getdata({ data: 'group/inviteJoin' }, { access_token: token, group_id: this.data.id, user_id:e.detail.value.user_id}).then(res=>{
      if(res.data.code==1000){
        wx.showToast({
          title: '邀请成功',
          icon: 'success',
          duration: 2000
        });
        reques.nav('222')
      }else if(res.data.code==2009){
        wx.showToast({
          title: '请勿重复邀请',
          icon: 'none',
          duration: 2000
        });
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
  
  }
})