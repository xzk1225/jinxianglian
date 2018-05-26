// pages/fabu/huodong.js
import reques from '../../../utils/reques.js'
let app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: 0,
    val: false,
    industry: '必选',
    lxarr: app.globalData.industry,
    catesarr: ['创业', '公益', '亲子', '科技','运动'],
    tianshu: app.globalData.tianshu,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    this.setData({
      id:options.id
    })
    let that = this;
    reques.getdata({ data: 'pay/account' }, { access_token: token }).then(res => {
      console.log(res.data)
      that.setData({
        money: res.data.result.money
      })
    })
    reques.getdata({ data: 'content/price' }, { access_token: token }).then(res => {
      that.setData({
        price: res.data.result
      })
    })

    reques.getdata({ data: 'content/info' }, { access_token: token, id: options.id }).then(res => {
      Date.prototype.toLocaleString = function () {  // 时间原型修改
        return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
      };
      let len = res.data.result.length
      for (var i = 0; i < len; i++) {
        let commonTime = null
        let timestamp = new Date((res.data.result[i].end_time) * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间
        let star = new Date((res.data.result[i].start_time) * 1000);
        let starr = null;
        commonTime = timestamp.toLocaleString();
        starr = star.toLocaleString();
        res.data.result[i].end_time = commonTime;
        res.data.result[i].start_time = starr;
      }

      that.setData({
        info: res.data.result,
        start_time: res.data.result.start_time,
        end_time: res.data.result.end_time,
        cates: res.data.result.industry,

    // e.detail.value.province = this.data.province;
    //     e.detail.value.city = this.data.city;
    //     e.detail.value.industry = this.data.hangye;
    //     e.detail.value.cates = this.data.cates;
    //     e.detail.value.type = 3;
    //     e.detail.value.week = this.data.week;
    //     e.detail.value.district = this.data.district;
        region: [res.data.result.province, res.data.result.city, res.data.result.district]
      })
    })



  },
  del() {
    let that=this;
    wx.showModal({
      title: '提示',
      content: '确定取消本次活动吗？',
      success: function (res) {
        if (res.confirm) {
          reques.getdata({ data: 'content/del' }, { access_token: wx.getStorageSync('token'), id: that.data.id }).then(res => {
            if (res.data.code == 1000) {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                  reques.nav('aaa')
                }
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.city = this.selectComponent("#city");
    this.city.run()
    this.city.bindChange()
    this.city.data.region=this.data.region;
    this._confirmEvent()
  },
  bindDateChange(e){
    console.log('picker发送选择改变，携带值为', e)
    var str=e.target.dataset.name
    this.setData({
      [str]: e.detail.value
    })
  },
  leixing: function (e) {
    var str = e.currentTarget.dataset.arr   //获取类型的数组的名称
    var array = this.data[str]  //获取类型的数组
    var strin = e.currentTarget.dataset.id   //获取她的名字
    var _this = this
    wx.showActionSheet({
      itemList: array,
      success: function (res) {
        _this.setData({
          [strin]: res.tapIndex
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
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
  bindRegionChange: function (e) {
    this.city.pikerScenes()
  },
  _confirmEvent: function (e) {
    //获取城市的总数组。
    var arr = this.city.data.region, that = this;
    for (var k in arr) {
      const str = 'region[' + k + ']'
      that.setData({
        [str]: arr[k].regname,
        province: arr[0].regid,
      })
      if (k == 2) {
        that.setData({
          district: arr[k].regid
        })
      }
    }
    that.setData({
      province: arr[0].regid,
      city: arr[1].regid,
      district: arr[2].regid,
    })

  },
  chang(e) {
    if (e.detail.value == 1) {
      this.setData({
        val: true
      })
    } else {
      this.setData({
        val: false,
        week: 0
      })
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      week: e.detail.value
    })
  },
  formSubmit: function (e) {
    // 发送表单id
    reques.getdata({ data: 'public/saveMpFormID' }, { access_token: wx.getStorageSync('token'), id: e.detail.formId })

    e.detail.value.access_token = wx.getStorageSync('token')
    e.detail.value.province = this.data.province;
    e.detail.value.city = this.data.city;
    e.detail.value.industry = this.data.hangye;
    e.detail.value.cates = this.data.cates;
    e.detail.value.type = 3;
    e.detail.value.week = this.data.week;
    e.detail.value.district = this.data.district;
    reques.getdata({ data: 'content/send' }, e.detail.value).then(res => {
      console.log(res.data)
      if (res.data.code == 1000) {
        reques.nav('213')
      }
    })
  },
})