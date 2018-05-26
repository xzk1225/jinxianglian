// pages/my/page/finance.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    parent_reply_id:null,
    review_id:null,
    display:false,
    p:0,
    id: 0,
    place:'',
    pl_id:null,info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      id:options.me
    })
    if(options.me==0){
      wx.setNavigationBarTitle({
        title: '我的动态'
      })
      this.getdata()
    }else{
      wx.setNavigationBarTitle({
        title: '好友动态'
      })
      this.getdata()
    }
    reques.getdata({ data: 'user/userInfo' }, { access_token: wx.getStorageSync('token'), user_id: options.me}).then(res=>{
      console.log(res.data)
      that.setData({
        info:res.data.result
      })
    })
  },
  getdata:function(){
    var that = this;
  
    
    reques.getdata({ url: 1, data: 'interfaces/bbs/mypostlist' }, { access_token: wx.getStorageSync('token'), user_id: that.data.id, p: that.data.p, num: 5 }).then(res => {
     
      
      let len = res.data.result.length
      for(var i=0;i<len;i++){
       let commonTime = null
        let timestamp = new Date((res.data.result[i].add_time)*1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        commonTime = timestamp.toLocaleString();
        res.data.result[i].add_time = commonTime
      }
     that.setData({
        dt_list: res.data.result
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
  onShareAppMessage: function (res) {

  },

  delete:function(e){   //删除事件
    // console.log(e)
    let that = this, id = e.target.dataset.id, index = e.target.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除本条动态吗？',
      success: function (res) {
        if (res.confirm) {
            reques.getdata({ url: 'qqq', data: 'interfaces/bbs/del' }, { access_token: wx.getStorageSync('token'), post_id: id}).then(res=>{
             if(res.data.code==1000){
              //  var newarr = that.data.dt_list
              //  newarr.splice(index, 1);
              //     that.setData({
              //       dt_list:newarr
              //     })
               that.getdata()
             }
            })
        } else if (res.cancel) {
          
        }
      }
    })
  },
  zan:function(e){
    var token = wx.getStorageSync('token');
    
    let id = e.currentTarget.dataset.id;
    
    reques.getdata({ url: 2, data: 'interfaces/bbs/like' }, { access_token: token,post_id:id} ).then(res=>{
      console.log(res.data)
    })
      
  },
  confirm:function(e){
    var token = wx.getStorageSync('token');
    
    const that=this
    console.log(e)
    if (e.target.dataset.id){
      console.log(1)
      let id = e.target.dataset.id
      reques.getdata({ url: 2, data: 'interfaces/bbs/review' }, { access_token: token, post_id: id ,content:e.detail.value}).then(res => {
        that.getdata()
      })
    }else{
      let parent_reply_id = e.target.dataset.parent_reply_id, review_id = e.target.dataset.review_id;
      reques.getdata({ url: 2, data: 'interfaces/bbs/reply' }, { access_token: token, review_id: review_id, parent_reply_id: parent_reply_id, content: e.detail.value }).then(res => {
        that.getdata()
      })


      
console.log(2)
    }
 

  },
  input:function(e){  //点级评论的时候
    this.setData({
      display:!this.data.display,
      pl_id: e.currentTarget.dataset.id
    })
 
  },
  blur:function(e){ //input 失去焦点的时候  隐藏。
    this.setData({
      display:false
    })
    this.confirm(e)
  },
  reply:function(e){ //回复评论前的事件
  console.log(e)
  this.setData({
    display:!this.data.display,
    review_id: e.currentTarget.dataset.review_id,
    parent_reply_id: e.currentTarget.dataset.parent_reply_id
  })
  },
  delete_reply:function(e){ //删除评论事件
    var token = wx.getStorageSync('token');
  
    const that=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除评论吗？',
      success: function (res) {
        if (res.confirm) {
          let review_id = e.currentTarget.dataset.review_id;
          reques.getdata({ url: 2, data: 'interfaces/bbs/delreview' }, { access_token: token, review_id: review_id }).then(res => {
            that.getdata()
          })
        } else if (res.cancel) {
          
        }
      }
    })



  }
})