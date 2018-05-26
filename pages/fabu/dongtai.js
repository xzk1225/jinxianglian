// pages/fabu/dongtai.js
import reques from '../../utils/reques.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:null,
    images_arr:null
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
  blur:function(e){
    this.setData({
      val:e.detail.value
    })
  },
  open(){
    let that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          images_arr: tempFilePaths
        })
        console.log(res.tempFilePaths)
      }
    })
  },
  formSubmit:function(e){
    const that=this;
    console.log(this.data.images_arr)
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })

    console.log(this.data.val)

      if(this.data.val==null||this.data.val==''){
        wx.showToast({
          title: '请填写要输出信息',
          icon:'none'
        })
      }else{
        // reques.up({
        //   path: that.data.images_arr,
        //   data: { access_token: wx.getStorageSync('token'), content: this.data.val, }
        // })
        reques.up(that.data.images_arr[0], { access_token: wx.getStorageSync('token'), content: this.data.val }, 'pic_list').then(res=>{
          console.log(res.data)
          res.data = JSON.parse(res.data)
          if(res.data.code==1000){
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000,
              success:function(){
                reques.nav('aaa')
                console.log(1)
              }
            })
            // wx.showToast({
            //   title: '发布成功',
            //   success:function(){
            //     reques.nav('aaa')
            //     console.log(1)
            //   }
            // })
            
          }
        })
   
      
        // app.uploadimg({
        //   url: 'https://www.gxfcbj.com/v/web/index.php/interfaces/bbs/send',//这里是你图片上传的接口
        //   path: that.data.images_arr//这里是选取的图片的地址数组
        // });
     
      }




   

// console.log(res)
  
  }
})