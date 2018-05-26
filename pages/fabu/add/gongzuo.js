// pages/my/page/geren/gongzuo.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'必填'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
   var str= e.currentTarget.dataset.name;
    this.setData({
      [str]: e.detail.value
    })
  },
  formSubmit(e){
    let token = wx.getStorageSync('token');
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })

    console.log(e)   
    e.detail.value.access_token=token;
    reques.getdata({ data: 'user/workadd' },e.detail.value).then(res=>{
      if(res.data.code==1000){
        reques.nav('ss')
      }
    
    })
  }
})