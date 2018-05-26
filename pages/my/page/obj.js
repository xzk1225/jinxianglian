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
      '我发布的项目', '我收藏的'
    ],
    id: 0,
    arr: [
      { time: '55555555', id: 5555,name:'fangshi',gs:'www' },
      { time: '55555555', id: 5555, name: 'fangshi' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    
    this.setData({
      data: { access_token: token, type: 5, p: this.data.p, cate: 1, num: 20, user_id: 0 },
      url: 'content/list'
    })
    this.getdata(this.data.url,this.data.data)
  },
  getdata(url,data) {  // 发布的职位
    let that = this;
    reques.getdata({ data: url }, data).then(res => {
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
    this.getdata(this.data.data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

  },

  changId: function (e) {
    let token = wx.getStorageSync('token');
    
    this.setData({
      id: e.currentTarget.dataset.id,
      cate: e.currentTarget.dataset.id+1,
      p:1
    })
    if (e.currentTarget.dataset.id==0){
      this.setData({
        data: { access_token: token, type: 5, p: this.data.p, cate: 1, num: 20, user_id: 0 },
        url: 'content/list'
      })
    }else{
      this.setData({
        data: { access_token: token, type: 5, p: this.data.p, cate: 2, num: 20},
        url: 'content/list'
      })
    }

    // this.setData({
    //   data: { access_token: token, type: 5, p: this.data.p, cate: this.data.cate, num: 20, user_id: 0 }
    // })
    this.getdata(this.data.url,this.data.data)
  }
})