// pages/my/page/finance.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: [
      '我发布的活动', '我参与的活动', '我收藏的'
    ],
    id: 0,
    arr:[
      {time:'55555555',id:5555}
    ],p:1,
    cate:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    Date.prototype.toLocaleString = function () {  // 时间原型修改
      return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
    };
    this.setData({
      data: { access_token: token, type: 3, p: this.data.p, cate: this.data.cate, num: 20, user_id: 0 }
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
  // 我参与的活动
  jl_list(data) {
    let that = this;

    reques.getdata({ data: 'content/joinMyList' }, data).then(res => {
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
  // 我的收藏
  like(data) {
    let that = this;
    reques.getdata({ data: 'content/likeMyList' }, data).then(res => {
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
    this.getdata(this.data.data)
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

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
        console.log(2)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  yq: function () {
    // this.onShareAppMessage()
  },
  changId: function (e) {
    let token = wx.getStorageSync('token');
    
    this.setData({
      id: e.currentTarget.dataset.id,
      p: 1
    })
    if (e.currentTarget.dataset.id == 0) {
      this.setData({
        data: { access_token: token, type: 3, p: this.data.p, cate: this.data.cate, num: 20, user_id: 0 }
      })
      this.getdata(this.data.data)
    } else if (e.currentTarget.dataset.id == 1) {
      this.setData({
        data: { access_token: token, type: 3, p: this.data.p++, num: 10 }
      });
      this.jl_list(this.data.data)
    } else {
      this.setData({
        data: { access_token: token, type: 3, p: this.data.p++, num: 10 }
      });
      this.like(this.data.data)
    }
  },
 
  submit:function(e){
    // 删除提交的时候的值为 e.currentTarget.dataset.value
  console.log(e)
  }
})