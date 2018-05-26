// pages/indexx/xiangqing/zijin.js
import reques from '../../../utils/reques.js'
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
    let token = wx.getStorageSync('token');
    
    this.setData({
      id: options.id,
      user_id: options.user_id
    })
    let that=this;
    //获取详情
    reques.getdata({ data: 'content/info' }, { access_token: token, id: options.id}).then(res=>{
      Date.prototype.toLocaleString = function () {  // 时间原型修改
        return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
      };
        let commonTime = null
        let timestamp = new Date((res.data.result.add_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        commonTime = timestamp.toLocaleString();
        res.data.result.add_time = commonTime
      that.setData({
        info:res.data.result
      })
    })
    // 获取 最近访客
    reques.getdata({ data: 'content/viewlist' }, { access_token: token, id: options.id }).then(res => {
      that.setData({
        photo: res.data.result
      })
    })
    // 获取 职位发布人信息
    reques.getdata({ data: 'user/userInfo' }, { access_token: token, user_id: options.user_id }).then(res => {
      that.setData({
        userInfo: res.data.result
      })
    })
    // 获取她发的其它职位
    reques.getdata({ data: 'content/list' }, { access_token: token, user_id: options.user_id, type: 1 }).then(res => {
      that.setData({
        zwlist: res.data.result[0]
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
  sc() {  //  收藏
    let token = wx.getStorageSync('token'),that=this;
  
    if (this.data.info.is_like) {
      var type = 3;
    } else {
      var type = 2;
    }
    reques.getdata({ data: 'content/operation' }, { access_token: token, id: this.data.id, type: type }).then(res => {

      if (res.data.code == 1000) {
        if (type == 2) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          type = 3
          wx.showToast({
            title: '取消收藏',
            icon: 'none',
            duration: 2000
          })
        }

      }
      reques.getdata({ data: 'content/info' }, { access_token: token, id: that.data.id }).then(res => {
        Date.prototype.toLocaleString = function () {  // 时间原型修改
          return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
        };
        let commonTime = null
        let timestamp = new Date((res.data.result.add_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        commonTime = timestamp.toLocaleString();
        res.data.result.add_time = commonTime
        that.setData({
          info: res.data.result
        })
      })





    })
  },
  td() {  // 投递
    let token = wx.getStorageSync('token');
  
    reques.getdata({ data: 'content/operation' }, { access_token: token, id: this.data.id, type: 4 }).then(res => {
     
      if (res.data.code == 1000) {
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})