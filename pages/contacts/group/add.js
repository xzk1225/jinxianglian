// pages/contacts/group/add.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   id:null,
  lx:' ',
  botto:0,
  lx_list:[
    '手机','电脑','iphone'
  ]
  },
  input:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id
      })
    }
    let that= this 
    reques.getdata({ data:'group/cates'}).then(res=>{ //  获取类型
    const arr=[];

    for (var k in res.data.result){
      arr.push(res.data.result[k].name)
    }
      that.setData({
        lx_list:arr,
        newarr: res.data.result
      })
    })
    reques.getdata({})   // 缺少修改
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    this.setData({
      botto: -this.data.lx_list.length*50
    })
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
  // 类型选择
  lxxz:function(e){
    var that = this
    wx.showActionSheet({
      itemList: that.data.lx_list,
      success: function (res) {
        that.setData({
          lx: res.tapIndex
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  
  },

  xz:function(e){
    
    // this.setData({
    //   botto: -this.data.lx_list.length * 50,
    //   isShow: !this.data.isShow,
    //   lx: this.data.lx_list[e.currentTarget.dataset.index]
    // })
  
  },
  submit:function(e){
    e.detail.value.access_token = wx.getStorageSync('token');
let that=this;
   
// 发送表单id
reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })
    wx.getLocation({
      type: 'gcj02 ',
      success: function (res) {
        e.detail.value.lat = res.latitude;
        e.detail.value.lon = res.longitude; 
        e.detail.value.cate = that.data.newarr[that.data.lx].id; 
       
        reques.getdata({ data: 'group/create' }, e.detail.value).then(res => {
          if (res.data.code == 1000) {
            wx.showToast({
              title: '创建成功',
              success:function(){
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  },1500)
                })
               
              }
            })
            
          }
        })
      }
    })
 
    
  }
})