// pages/contacts/tz/index.js
import reques from '../../../utils/reques.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    p:1,
  list:[
   {type:0}
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    this.setData({
      data: { access_token:token,p:this.data.p++,num:8,}
    })
   this.getdata(this.data.data)
  },
  getdata(data){
    let token = wx.getStorageSync('token');
    let that=this;
    reques.getdata({ data: 'public/pushList' }, data).then(res=>{
      const arr=this.data.list;
      that.setData({
        list: arr.concat(res.data.result)
      })
    })
  },
  alert(e){
 
    let  that=this;
    wx.showModal({
      title: '系统通知',
      content: that.data.list[e.currentTarget.dataset.index].content,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    this.getdata(this.data.data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  accept(e){
    let token = wx.getStorageSync('token');
    console.log(e)
    let user_id = e.currentTarget.dataset.user_id,
      rid = e.currentTarget.dataset.rid;

   
  
   switch(e.currentTarget.dataset.type) {
        case 1:
       requse.getdata({ data: 'user/acceptFriend' }, { access_token: token, to_user_id: user_id }).then(res => {
         if (res.data.code == 1000) {
           wx.showToast({
             title: '接受',
             icon: 'success',
             duration: 2000
           })
         }
       })
          break;
          // case 2: 
          //   requse.getdata({ data: 'user/acceptFriend' }, { access_token: token, to_user_id: user_id }).then(res => {
          //     if (res.data.code == 1000) {
          //       wx.showToast({
          //         title: '接受',
          //         icon: 'success',
          //         duration: 2000
          //       })
          //     }
          //   })
          //   break;
        case 3:
         
       
          requse.getdata({ data: 'group/audit' }, { access_token: token, to_user_id: user_id, group_id: rid }).then(res => {
         if (res.data.code == 1000) {
           wx.showToast({
             title: '接受',
             icon: 'success',
             duration: 2000
           })
         }
       })
          break;
 
         
      }
  }
})