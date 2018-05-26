// pages/indexx/page/zhiwei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cheng: false,
    citya: '北京',
    seniora: false,
    array: [
      {
        leix: '行业', list: [
          '创业', '公益', '亲子', '科技', '运动'
        ]
      },
      {
        leix: '学历', list: [
          '专科', '本科', '硕士', '博士', '博士后', '其它'
        ]
      },
      {
        leix: '工作年限', list: [
          '1年以下', '1-3年', '3年以上'
        ]
      }
    ],
 



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
  qiehuan: function (e) {
    console.log(e)
    this.setData({
      city: this.data.provinces[e.currentTarget.dataset.id].citys
    })
  },
  cityy: function (e) {
    this.setData({

      citya: this.data.city[e.currentTarget.dataset.id].citysName,
      cheng: !this.data.cheng
    })
  },
  chengshi: function () {  //城市的。选项

    this.setData({
      cheng: !this.data.cheng,
      seniora: false
    })
  },
  senior: function () {    //  高级筛选  点击显示
    this.setData({
      seniora: !this.data.seniora,
      cheng: false
    })
  },


  // 单选判断
  danxuan: function (e) {
    console.log(this)
    console.log(e.detail.value)
    this.setData({
      checked: e.detail.value
    })
  },
  submit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})