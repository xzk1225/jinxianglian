// pages/my/page/finance.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p: 1,
    cate: 1,
    header: [
      '我发布的产品',  '我收藏的'
    ],
    id: 0,
    arr: [
      { time: '55555555', id: 5555, name: 'fangshi', gs: 'www' },
      { time: '55555555', id: 5555, name: 'fangshi' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    
    this.setData({
      data: { access_token: token, type: 6, p: this.data.p, cate: this.data.cate, num: 20, user_id: 0 }
    })
    this.getdata(this.data.data)
  },
  getdata(data) {  // 发布的职位
    let that = this;

    reques.getdata({ data: 'content/list' }, data).then(res => {

      let len = res.data.result.length
      for (var i = 0; i < len; i++) {
        let commonTime = null
        let timestamp = new Date((res.data.result[i].add_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        commonTime = timestamp.toLocaleString();
        res.data.result[i].add_time = commonTime
      }
      that.setData({
        list: res.data.result
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

  changId: function (e) {
    const token = wx.getStorageSync('token');
    
    this.setData({
      id: e.currentTarget.dataset.id,
      p:0
    })
    if (e.currentTarget.dataset.id == 0) {

      this.setData({
        data: { access_token: token, type: 6, p: this.data.p, cate: 1, num: 20, user_id: 0 }
       
      })
    } else {
      this.setData({
        data: { access_token: token, type: 6, cate: 2, p: this.data.p++,  num: 20 }
       
      })
    }



    this.getdata( this.data.data)


  }
})