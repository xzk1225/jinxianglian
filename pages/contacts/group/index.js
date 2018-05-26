// pages/contacts/group/index.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  add:true,
  data_nav:[ '我管理的','我加入的'],
  index:1,
  data_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    
   this.getdata()
  },
  choice:function(e){
    this.setData({
      index:e.currentTarget.dataset.index
    })
    this.getdata()
  },
  getdata:function(e){
    var token = wx.getStorageSync('token')
    
    const that=this
    reques.getdata({ data: 'group/list' }, { access_token: token, type: this.data.index }).then(res => {
      console.log(res.data)
      that.setData({
        data_list:res.data.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.search =  this.selectComponent("#search");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getdata()
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
  jump:function(e){
    
    if(this.data.index==1){   //在这类区分开是我管理的还是我加入的群。
    
      reques.nav('../../indexx/xiangqing/group', { id: e.currentTarget.dataset.id,me:1 })
      
    }else{
      
      reques.nav('../../indexx/xiangqing/group', { id: e.currentTarget.dataset.id })
      
    }
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
  confirm:function(e){
    var token = wx.getStorageSync('token');
    
    let that=this;
    reques.getdata({ data: 'group/list' }, { access_token: token, type: 0, name:this.search.data.val}).then(res=>{
        that.setData({
          data_list:res.data.result
        })
    })
  }
})