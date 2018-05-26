
// pages/indexx/index.js
var aoo = getApp();

import reques from '../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typ:null,
    list: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 0
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: '基金大家庭金融投资', friend: 1
      }
    ],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this, data = null;
    let token = wx.getStorageSync('token');
    this.setData({
      typ:options.type
    })
    if (options.type==11){
      wx.setNavigationBarTitle({
        title: '访客'
      })
    } else if (options.type == 5){
      wx.setNavigationBarTitle({
        title: '同城同乡'
      })
    } else if (options.type == 9) {
      wx.setNavigationBarTitle({
        title: '同事'
      })
    } else if (options.type == 6) {
      wx.setNavigationBarTitle({
        title: '同乡'
      })
    } else if (options.type == 7) {
      wx.setNavigationBarTitle({
        title: '同城'
      })
    } else if (options.type == 8) {
      wx.setNavigationBarTitle({
        title: '同校'
      })
    } else if (options.type == 10) {
      wx.setNavigationBarTitle({
        title: '同行业'
      })
    } else if (options.type == 3) {
      wx.setNavigationBarTitle({
        title: '共同好友'
      })
    }



   
    if (options.type == 2) {
      wx.setNavigationBarTitle({
        title: '附近的人'
      })
      this.setData({
        distance:true
      })
      var lat='',lon='';
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          lat = res.latitude
          lon = res.longitude
          data = { access_token: token, type: options.type, lat: lat, lon: lon };
          
          reques.getdata({ data: 'user/search' }, data).then(res => {

            that.setData({
              list: res.data.result
            })
          })
        }
      });
      
     

    } else {
      data = { access_token: token, type: options.type };
      reques.getdata({ data: 'user/search' }, data).then(res => {

        that.setData({
          list: res.data.result
        })
      })

    }
   
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
  add: function () {
    // reques.getdata({ data: 'user/addFriend' }, { access_token: wx.getStorageSync('token'), to_user_id:})

  }
})
