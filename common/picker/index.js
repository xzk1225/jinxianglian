// common/picker/index.js
var area = require('../../utils/area.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    are: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // wxml显示数据 
    region: [

    ],
    home: [],
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
   * 组件的方法列表
   */
  methods: {
    run: function () {
      let that = this;
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
      var cityList = area.areaParent(provinceInfo['regid']);
      if (this.data.are) {
        cityList.unshift({ regid: -1, reaname: '不限' })
      }

      var cityListLength = cityList.length
      // 队列超长处理
      if (cityListLength < value[1] + 1) {
        value[1] = 0;
      }
      // 选中市信息
      var cityInfo = cityList[value[1]];

      // 区列表数据
      var areaList = area.areaParent(cityInfo['regid']);
      this.data.are ? areaList.unshift({ regid: -1, reaname: '不限' }) : '';

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
    pikerScenes: function () {
      var that = this
      var pikerScenes = that.data.pikerScenes;
      var p = pikerScenes == true ? false : true;
      that.setData({
        pikerScenes: p
      })
    },

    // 点击了piker 的确认
    pikerConfirm: function () {
      var that = this
      that.setData({
        region: that.data.regionInfo
      })

      // 隐藏piker

      if (this.data.region.length == 0) {
        wx.showToast({
          title: '请选择',
          icon: 'none',
          duration: 2000
        })
      }
      that.pikerScenes()
      this.triggerEvent("confirmEvent");
    },
    // 点击了piker 的取消
    pikerCancel: function () {
      var that = this;
      // 隐藏piker
      that.pikerScenes();
      this.triggerEvent("cancelEvent");
    },
  }
})
