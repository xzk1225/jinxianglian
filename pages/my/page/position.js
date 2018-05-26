// pages/my/page/jianli.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: [
      '我发布的职位', '收到的简历', '会员收藏'
    ],
    id: 0,
    zw_arr: [
      { position: 'wwww', name: '北京', time: '2055-88-88' },
      { position: 'wwww', name: '北京', time: '2055-88-88' },
      { position: 'wwww', name: '北京', time: '2055-88-88' },
      { position: 'wwww', name: '北京', time: '2055-88-88' },
      { position: 'wwww', name: '北京', time: '2055-88-88' }
    ],
    select:false,
    cate: 1,
    p:1,
    list:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    
    this.setData({
      data: { access_token: token, type: 1, p: this.data.p, cate: this.data.cate , num: 20, user_id: 0 }
    })
  this.getdata(this.data.data)
  },
getdata(data){  // 发布的职位

  let that=this;

  reques.getdata({ data: 'content/list' },data ).then(res => {
 
    let len = res.data.result.length
    for (var i = 0; i < len; i++) {
      let commonTime = null
      let timestamp = new Date((res.data.result[i].add_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
      commonTime = timestamp.toLocaleString();
      res.data.result[i].add_time = commonTime
    }
    that.setData({
      list:res.data.result
    })
  })
},
// 收到的简历
  jl_list(data){
    let that=this;
   
    reques.getdata({ data: 'content/joinMyList' },data).then(res=>{
      let len = res.data.result.length
      for (var i = 0; i < len; i++) {
        let commonTime = null
        let timestamp = new Date((res.data.result[i].add_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        commonTime = timestamp.toLocaleString();
        res.data.result[i].add_time = commonTime
      }
      that.setData({
        list:res.data.result
      })
    })
  },
like(data){
  let that = this;
  reques.getdata({ data:'content/likeMyList'},data).then(res=>{
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
    this.getdata(this.data.cate,this.data.p)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changId: function (e) {
    let token = wx.getStorageSync('token');
    
    this.setData({
      id: e.currentTarget.dataset.id,
      p:1
    })
    if (e.currentTarget.dataset.id==0){
      this.setData({
        data: { access_token: token, type: 1, p: this.data.p, cate: this.data.cate, num: 20, user_id: 0 }
      })
      this.getdata(this.data.data)
    } else if (e.currentTarget.dataset.id == 1){
      this.setData({
        data: { access_token: token, type: 1, p: this.data.p++, num: 10 }
      });
      this.jl_list(this.data.data)
    }else{
      this.setData({
        data: { access_token: token, type: 1, p: this.data.p++, num: 10 }
      });
      this.like(this.data.data)
    }
  },
  chang:function(){
    
    this.setData({
      select: !this.data.select 
    })
  },
  
  submit:function(e){
      if(e.detail.value.arr.length>0){

      }
    return false
  },
  bj(e){
    requesnav('../gai/zhiwei',{})
  }
})