// pages/my/page/geren/tianjia.js
import reques from '../../../utils/reques.js'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    var  that=this ,arr=[],str={};
    reques.getdata({ data:'user/tags'}).then(res=>{

    for (var k in res.data.result){
      str = { id: k, name: res.data.result[k] };

      arr.push(str)
      
    }
        that.setData({
          items:arr
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
  formSubmit(e){
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })

    const token = wx.getStorageSync('token');
    console.log(e.detail.value.tag_ids.join())
    reques.getdata({ data: 'user/setTags' }, { access_token: token, tag_ids: e.detail.value.tag_ids.join()}).then(res=>{
      if(res.data.code==1000){
        reques.nav('asd')
      }
    })
  }
 
  
})