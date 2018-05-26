// pages/indexx/xiangqing/group.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  info:{},
  gl:null,
  no:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    
    if(options.no){
      this.setData({
        no:options.no
      })
    }
    if(options.me){
      this.setData({
        gl:options.me
      })
    }
    const that=this;
    console.log(options)
    reques.getdata({ data: 'group/info' }, { access_token:token,id:options.id}).then(res=>{
      Date.prototype.toLocaleString = function () {  // 时间原型修改
        return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
      };


      let commonTime = null
      let timestamp = new Date((res.data.result.add_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
      commonTime = timestamp.toLocaleString();
      res.data.result.add_time = commonTime

      console.log(res.data)
      that.setData({
        info:res.data.result
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
  jump: function (e) {
   if(this.data.gl){
     reques.nav('../../contacts/group/group_details', { id: e.currentTarget.dataset.id, gl: this.data.me })
     
   }else{
     
    if(this.data.no){
      reques.nav('../../contacts/group/group_details', { id: e.currentTarget.dataset.id,no:this.data.no })
    }else{
      reques.nav('../../contacts/group/group_details', { id: e.currentTarget.dataset.id })
    }
   }
  },
  jumpa:function(e){
    const token = wx.getStorageSync('token');
    
   
    let url=e.currentTarget.dataset.code
    wx.previewImage({
      current:url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  join:function(e){
    const token = wx.getStorageSync('token');
    let id = e.currentTarget.dataset.id;
    reques.getdata({ data: 'group/join' }, { access_token: token, group_id:id}).then(res=>{
      console.log(res.data)
      if(res.data.code==1000){
        wx.showToast({
          title: '申请成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  out:function(e){
    const token = wx.getStorageSync('token');
    
    let id = e.currentTarget.dataset.id;
    reques.getdata({ data: 'group/out' }, { access_token: token, group_id: id }).then(res => {
      if(res.data.code==1000){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        reques.nav(1)
      }
    })
  }
})