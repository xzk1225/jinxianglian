//app.js
import reques from '/utils/reques.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    try {
      var value = wx.getStorageSync('token')
      if (!value) {
        // Do something with return value
        this._login()
       
      }else{
      
      }
    } catch (e) {
      // Do something when catch error
    }
    // 登录

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
      
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       console.log(1)
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.Info = res.userInfo
    //           console.log(res.userInfo)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }, fail: function (e) {
    //           console.log(e)
    //         }
    //       })
    //     }
    //   }
    // })
  },
 _login(){
   wx.login({
     success: res => {
       // 发送 res.code 到后台换取 openId, sessionKey, unionId
       var code = res.code
       var send = {   //拼接好请求后台用哪个的data
         code: code,
         encryptedData: res.encryptedData,
         iv: res.iv
       }
       var that = this;
       var a = reques.getdata({ data: 'auth/mpLogin' }, send)
       a.then(data => {
         console.log(data.data.result.access_token)
         wx.setStorage({
           key: 'token',
           data: data.data.result.access_token,
         })
       })
       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
       // 所以此处加入 callback 以防止这种情况
     }, 
       })
 },

  globalData: {
    token:null,
    Info: null,
    edu: ['其他','专科', '本科', '硕士', '博士','博士后'],
    work_year: ['1年', '1-3年', '3-5年','5-10年','10年以上']	,
    wage: ['3-5k','5k-8k', '8k-10k', '10k-15k','15k-20k'],
    tianshu:['一周','二周','三周'],
    industry:'',
    nav_list: [
      { product_type: '信托', url: '/images/cp_xt.jpg' },
      { product_type: '资管', url: '/images/cp_tg.jpg' },
      { product_type: '基金', url: '/images/cp_jj.jpg' },
      { product_type: 'P2P', url: '/images/cp_p2p.jpg' },
      { product_type: '保险', url: '/images/cp_bx.jpg' },
      { product_type: '贷款', url: '/images/cp_xt.jpg' }
    ],
    product_type_1:[
      { leix:'投资领域', name: 'domain', list: ['房地产', '金融市场', '基础设施', '工商企业','其他']},
      { leix: '投资期限',  name: 'invest_deadline', list: ['2个月以下', '2个月- 12个月', '12个月- 24个月', '24个月- 36个月', '36以上'] },
      { leix: '投资收益',  name: 'earnings', list: ['7%以内', '7% -8 %', '8% -9 % ', '9% -10 %', '10% 以上','浮动'] },
      { leix: '付息方式',  name: 'way', list: ['7%按月付息', '按季付息', '按半年付息', '按年付息', '到期付本息'] },
      { leix: '募集规模',  name: 'size', list: ['1000万以内', '1000万- 5000万', '5000万- 1亿', '1亿- 5亿', '5亿以上'] }
    ],
    product_type_2: [
      { leix: '保障类型',  name: 'security_type', list: ['成人保险', '儿童保险', '中老年保险', '旅游出行', '交通安全', '房屋财产','汽车保险'] },
      { leix: '投保年龄',  name: 'age', list: ['0- 17周岁', '18-65周岁', '66周岁以上'] },
      { leix: '保障期限',  name: 'security_deadline', list: ['7%2周以内以内', '2周- 3个月', '3个月- 1年 ', '1年- 5年', '5年- 10年', '10年- 30年', '30年以上', '终生'] }
       ],
    product_type_3: [
      { leix: '贷款类型',  name: 'loan_type', list: ['信用贷款', '房产贷款', '汽车贷款', '企业贷款', '应急贷款', '信用卡', '其他'] },
      { leix: '贷款期限',  name: 'loan_deadline', list: ['随借随还', '1- 6月', '6-12月', '1年- 3年','三年以上'] },
    ],
    zijin: [

      {
        leix: '投资方式', list: [
          '股权投资', '债权投资', '金融投资', 'BT/ BOT项目投资', '其他投资'
        ], name: 'way'
      },
      {
        leix: '资金类型', list: [
          '个人资金', '企业资金', '天使投资', 'VC投资', 'PE投资'
        ], name: 'money_type'
      },
      {
        leix: '投资金额', list: [
          '1- 50万', '50- 100万', '100- 500万', '500- 1000万', '1000- 5000万', '5000 - 10000万'
        ], name: 'amount'
      }
    ],
    xiangmu: [
      {
        leix: '融资方式', name: 'way', list: ['股权融资', '债权融资', '整体转让', '其他融资']
      },
      {
        leix: '融资金额', name: 'amount', list: ['1-50万', '50-100万', '100-500万', '500-1000万', '1000-5000万', '5000-10000万']
      }
    ],		
  }
})
//   - 1      =>  '系统繁忙，稍后再试',
//     -2      =>  '系统处理超时',

// 1000    =>  '处理成功',
// 1001    =>  '处理失败',
// 1002    =>  'access_token非法',
// 1003    =>  'sign校验失败',
// 1004    =>  '请求参数缺失',
// 1005    =>  '请求中的appid不存在',
// 1006    =>  '请求中的appid无效/受限',
// 1007    =>  '要访问的api无访问权限',

// 2000    =>  '账号或密码不正确',
// 2001    =>  '账号被冻结',
// 2002    =>  '验证码错误',
// 2003    =>  '手机号码已被注册',
// 2005    =>  '该手机号码未被注册',
// 2006    =>  '旧密码验证失败',
// 2007    =>  '上传文件验证失败',
// 2008    =>  '你们已经是好友了',
// 2009    =>  '你已经邀请过该用户了，请勿重复邀请',

// 3001    => '余额不足',
// 3002    => '不满足提现条件',