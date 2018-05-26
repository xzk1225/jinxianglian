// pages/star/shenqing/index.js
import reques from '../../../utils/reques.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{ name: '美国', id: 0 }, { name: '中国', id: 2 }, { name: '巴西', id: 1 }, { name: '日本',id: 11}
      
     ],
    newarr: ['美国', '中国', '巴西','日本'],
    region: ['广东省', '广州市', '海珠区'],
    num:'',
    field:'领域',
    tian:'天数',
    fields:['aasdasd','asdasdasd','asdasdas'],
    arr: ['1周', '2周', '3周', '4周', '5周', '6周', '7周', '8周', '9周', '10周'],
    money:'',
    integral:0,
    id:''// id 为板块的id值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    reques.getdata({ data: 'pay/account' }, { access_token: token }).then(res => {
      console.log(res.data)
      that.setData({
        mone: res.data.result.money
      })
    })
    let that=this;
    reques.getdata({ data: 'user/starPrice' }, { access_token:token}).then(res=>{
      that.setData({
        money:res.data.result
      })
    });
    reques.getdata({ data:'public/starplates'}).then(res=>{
      that.setData({
        array:res.data.result
        
      })
      var arr = res.data.result, newarr = [];
      console.log(this.data.array)
      for (var key in arr) {
        newarr.push(arr[key].name)
      }
      this.setData({
        newarr: newarr
      })
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.city = this.selectComponent("#city");
    this.city.run()
    this.city.bindChange()
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

  bindRegionChange: function (e) { //城市选择

    this.city.pikerScenes()
   
  },
  bindPickerChange: function (e) { //领域选择
    var that = this;
    if (e.target.dataset.type == 'num') { //  num 为周数选择

      this.setData({
        num: Number(e.detail.value)+1+'周',
        integral: (Number(e.detail.value) + 1) * that.data.money
      })

    } else {

      this.setData({ // 这里为 天数板块选择
        index: e.detail.value,
        id: this.data.array[e.detail.value].id
      })
      console.log(this.data.id)
    }

  },
  bindRegionChange: function (e) {
    this.city.pikerScenes()
  },

  but: function () {
    const token = wx.getStorageSync('token');
    
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您将申请金融明星',
      success: function (res) {
     
        if (res.confirm) {
          reques.getdata({ data: "user/starApply" }, { access_token: token, plate_id: that.data.id, district: that.data.district, week: that.data.num }).then(res => {
            console.log(res.data)
            if (res.data.code == 1000) {
              
              wx.showToast({
                title: '申请成功',
                icon: 'success',
                duration: 2000
              })
              reques.nav('sss')
            } else if(res.data.code==2010){

            } 
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  _cancelEvent() {
    //触发取消回调
    this.city.pikerScenes()
  },
  _confirmEvent: function (e) {
    //获取城市的总数组。
    var arr = this.city.data.region,that=this;
   for( var k in arr){
     const str='region['+k+']'
     that.setData({
       [str]:arr[k].regname
     })
   
   }
    console.log( arr[2].regid)
    that.setData({
         district: arr[2].regid
       })
  },
})