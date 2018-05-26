// pages/my/page/bj.js
import reques from '../../../utils/reques.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    this.getdata()
    var province = 'region[0].regname';
    var city = 'region[1].regname';
    var district = 'region[2].regname';
    var home_province = 'home[0].regname';
    var home_city = 'home[0].regname';
    var home_district = 'home[0].regname';
    const that=this;
    reques.getdata({ data: 'user/userInfo' }, { access_token: token}).then(res=>{
  
      
          that.setData({
            info: res.data.result,
            [province]: res.data.result.province,
            [city]: res.data.result.city,
            [district]: res.data.result.district,
            [home_province]: res.data.result.home_province,
            [home_city]: res.data.result.home_city,
            [home_district]: res.data.result.home_district
          })
     
    })
  },
  getdata() {
    const token = wx.getStorageSync('token');
    let that = this;
    this.getedu();
    this.getwork()

    
    // 获取标签
    reques.getdata({ data: 'user/getTags' }, { access_token: token, user_id: 0 }).then(res => {
      that.setData({
        tags: res.data.result
      })
    })
  },
  getedu(){
    const token = wx.getStorageSync('token');
    let that = this;
    
    reques.getdata({ data: 'user/eduList' }, { access_token: token, user_id: 0 }).then(res => {
      that.setData({
        eduList: res.data.result
      })
    })
  },
  getwork(){
    const token = wx.getStorageSync('token');
    let that = this;
    
    reques.getdata({ data: 'user/workList' }, { access_token: token, user_id: 0 }).then(res => {
      that.setData({
        workList: res.data.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.gzjl = this.selectComponent("#gzjl");
  },
  dele(e){
    const token = wx.getStorageSync('token');
    let that=this;
 console.log(e)
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          if (e.currentTarget.dataset.name == 'jy') {
            reques.getdata({ data: 'user/edudel' }, { access_token: token, id: e.currentTarget.dataset.id }).then(res => {
              if (res.data.code == 1000) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                that.getedu()
              }
            })
          } else {
            reques.getdata({ data: 'user/workdel' }, { access_token: token, id: e.currentTarget.dataset.id }).then(res => {
              if (res.data.code == 1000) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                that.getwork()
              }
            })
          }

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

 
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getdata();
    const that = this;
    reques.getdata({ data: 'user/userInfo' }, { access_token: wx.getStorageSync('token') }).then(res => {

      that.setData({
        info: res.data.result,
        [province]: res.data.result.province,
        [city]: res.data.result.city,
        [district]: res.data.result.district,
        [home_province]: res.data.result.home_province,
        [home_city]: res.data.result.home_city,
        [home_district]: res.data.result.home_district
      })

    })
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
  disabled:function(){
   
  },
  submit:function(){
    console.log(1)
  },

  tjs:function(){
   
  this.submit()
  },
  img:function(){
    let that = this;
    wx.previewImage({
      current: that.data.avatar, // 当前显示图片的http链接
      urls: [that.data.avatar] // 需要预览的图片http链接列表
    })
  }
})