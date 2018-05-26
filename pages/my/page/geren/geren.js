// pages/my/page/geren/geren.js
import reques from '../../../../utils/reques.js'
// import reques from '../../../../utils/reques.js'
var area = require('../../../../utils/area.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typee:'',
    info:{},
    sex_arr: [ '男', '女'],
    avatar:null,
    // region: ['广东省', '广州市', '海珠区'],
        name:'席志开',
        phone:'13025465954',
        email:'8448484@qq.com',
        scenes: true,
        addresslist: [],

        // wxml显示数据 
        region: [
          { 'regid': 2  },
          { 'regid': 52 },
          { 'regid': 500 }
        ],
        home:[],
        // piker滚动选中值
        regionInfo: [],

        // 默认国家
        default_country: 1,
        // 默认选择数组 0:第一个数组 ，这里是三列
        value: [0, 0, 0],
        // 默认选择( 省、市、区)的值
        // 省市区 各列数组
        province: [],
        city: [],
        area: [],

        // piker显示场景 true:显示  false:不显示
        pikerScenes: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    

   this.getdata()
   var that = this;
   // that.requestAddressList();
   //console.log(that.requestAddressList());
   // 默认地区选择
   var select_picker = that.data.select_picker;
   var provinceList = area.areaParent(that.data.default_country);
   var cityList = area.areaParent(provinceList[0]['regid']);
   var areaList = area.areaParent(cityList[0]['regid']);
  
   that.setData({
     province: provinceList,
     city: cityList,
     area: areaList,
   
   });
  },
  getdata(){
    const token = wx.getStorageSync('token');
    
    var province = 'region[0].regname';
    var city = 'region[1].regname';
    var district = 'region[2].regname';
    var home_province = 'home[0].regname';
    var home_city = 'home[0].regname';
    var home_district = 'home[0].regname';
    const that = this;
    reques.getdata({ data: 'user/userInfo' }, { access_token: token }).then(res => {
      that.setData({
        info: res.data.result,
        avatar: res.data.result.avatar,
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getdata()
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
  img:function(){
    const token = wx.getStorageSync('token');
    
    var  ths=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
    
        reques.imgdata('user/updateUserInfo', tempFilePaths[0], { access_token:token}, 'avatar').then(res=>{
          res.data=JSON.parse(res.data)
       
         if(res.data.code==1000){
           wx.showToast({
             title: '成功',
             icon: 'success',
             duration: 2000,
             success:function(){
               ths.setData({
                 avatar: tempFilePaths
               })
             }
           })
         
         }
        })
      
      }
    })
  },
  jump:function(e){
    app.globalData.userInfo=e.currentTarget.dataset.name
  },
  sexx:function(){
    const token = wx.getStorageSync('token');
    
    var that=this
    wx.showActionSheet({
      itemList:that.data.sex_arr,
      success: function (ress) {
        reques.getdata({ data: 'user/updateUserInfo' }, { access_token: token, sex:ress.tapIndex}).then(res=>{
          if(res.data.code==1000){
            let str='info.sex'
            that.setData({
              [str] : ress.tapIndex+1
            })
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
       
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 地区选择器
  bindChange: function (e) {
    var that = this;
    var obj
    var value = e.detail.value;
    var info = that.data.regionInfo
    var v
    // 省列表数据
    var provinceList = area.areaParent(that.data.default_country);
    // 选中省信息
    var provinceInfo = provinceList[value[0]]

    // 市列表数据
    var cityList = area.areaParent(provinceInfo['regid'])
    var cityListLength = cityList.length
    // 队列超长处理
    if (cityListLength < value[1] + 1) {
      value[1] = 0;
    }
    // 选中市信息
    var cityInfo = cityList[value[1]];

    // 区列表数据
    var areaList = area.areaParent(cityInfo['regid']);
    // 选中区信息 
    var areaListLength = areaList.length
    // 队列超长处理
    if (areaListLength < value[2] + 1) {
      value[2] = 0;
    }
    var areaInfo = areaList[value[2]];
    obj = [provinceInfo, cityInfo, areaInfo]
    // 数据实例化
    that.setData({
      province: provinceList,
      city: cityList,
      area: areaList,
      value: value,
      regionInfo: obj
    })
    console.log(that.data.regionInfo)
  },
 
  
  // 控制piker框架是否显示
  pikerScenes: function (e) {
  

    var that = this;
    var pikerScenes = that.data.pikerScenes;
    var p = pikerScenes == true ? false : true;
    that.setData({
      pikerScenes: p,
      typee:e.currentTarget.dataset.type
    })
  },
  // 点击了piker 的确认
  pikerConfirm: function () {
    const token = wx.getStorageSync('token');
   
    var that = this;
    console.log(that.data.regionInfo)
    if(that.data.regionInfo.length<1){
      wx.showToast({
        title: '请选择',
        icon: 'none',
        duration: 2000
      })
      return false
    }
   if(this.data.typee=='home'){
     wx.showLoading({
       title: '更改中',
       mask:true
     });
    
          console.log('设置成功发出请求',that.data.home)
          reques.getdata({ data: 'user/updateUserInfo' }, { access_token: token, province: that.data.regionInfo[0].regid, city: that.data.regionInfo[1].regid, district: that.data.regionInfo[2].regid}).then(res=>{
       console.log(res.data)
        if(res.data.code==1000){
          wx.hideLoading();
         
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            home: that.data.regionInfo
          });
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '修改失败',
            icon: 'none',
           
          })
        }
     })
   }else{
     wx.showLoading({
       title: '更改中',
       mask: true
     });
     
     reques.getdata({ data: 'user/updateUserInfo' }, { access_token: token, home_province: that.data.regionInfo[0].regid, home_city: that.data.regionInfo[1].regid, home_district: that.data.regionInfo[2].regid }).then(res => {
       if (res.data.code == 1000) {
         wx.hideLoading();
        
         wx.showToast({
           title: '成功',
           icon: 'success',
           duration: 2000
         })
         that.setData({
           region: that.data.regionInfo
         })
       } else {
         wx.hideLoading();
         wx.showToast({
           title: '修改失败',
           icon: 'none',

         })
       }
     })
   
   }
    // 隐藏piker
   that.hide()
  },
  // 点击了piker 的取消
  pikerCancel: function (e) {
    var that = this;
    // 隐藏piker
    that.hide();
  },
  hide:function(){
    var that = this
    var pikerScenes = that.data.pikerScenes;
    var p = pikerScenes == true ? false : true;
    that.setData({
      pikerScenes: p,
     
    })
  }
})