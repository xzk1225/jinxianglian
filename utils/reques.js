var md5 = require('md5.js')
function getData(url, data) {
  let that=this;
  if (url.url) {
    var http = 'https://api.gxfcbj.com/v/web/index.php/'
  } else {
    var http = 'https://api.gxfcbj.com/'
  }
  var date = sign(data)
    return new Promise((resolve, reject) => {
   
       wx.request({
         url: http + url.data, //仅为示例，并非真实的接口地址
         data: date,
         method: 'POST',
         header: {
           'content-type': 'application/x-www-form-urlencoded' // 默认值
         },
         success: function (res) {
            //  这里是用的一个promise 在外部调用时候需要用到 。then(data()=>{data.data})
          //  if(res.data.code==1000){
          //    resolve(res)
          //  } else if (res.data.code == 1003){
          //    data.access_token=wx.getStorageSync('token')
          //   //  that.getdata(url, data)
          //  }
           switch (res.data.code) {
             case 1000:
               resolve(res)
               break;
             case 1001:
               wx.showToast({
                 title: '处理失败，请稍后再试',
                 icon: 'none'
               })
               resolve(res)
               break;
             case 3001:
             wx.showToast({
               title: '余额不足',
               icon:'none'
             })
             resolve(res)
               break;
             case 2009:
               wx.showToast({
                 title: '请勿重复邀请',
                 icon: 'none'
               })
               resolve(res)
               break;
             case 2010:
               wx.showToast({
                 title: '请先完成职业认证',
                 icon: 'none'
               })
               resolve(res)
               break;
             case -1:
               wx.showToast({
                 title: '系统繁忙',
                 icon: 'none'
               })
               resolve(res)
               break;
             case 6000:
               wx.showToast({
                 title: '小程序未正式发布，接口受限, 此功能无法开放',
                 icon: 'none'
               })
               resolve(res)
               break;
             case 2003:
               wx.showToast({
                 title: '手机号码已被注册',
                 icon: 'none'
               })
               resolve(res)
               break;
             case 2002:
               wx.showToast({
                 title: '验证码错误',
                 icon: 'none'
               })
               resolve(res)
               break;
             case 2006:
               wx.showToast({
                 title: '旧密码验证失败',
                 icon: 'none'
               })
               resolve(res)
               break;
             default:
               resolve(res)
             
           }



           //else{
           //   wx.showModal({
           //     title: '出错',
           //     content: '请联系管理员',
           //     success: function (res) {
           //       if (res.confirm) {
           //         wxNav('qweq')
           //       } else if (res.cancel) {
           //         wxNav('qweq')
           //       }
           //     }
           //   })
           // }
         },
         fail: function (err) {
           reject(err)
         }
       })
    })
};
function sign(data) {
  var str = '';
  if (data) {
    for (var k in data) {
      str += k + '=' + data[k] + '&'
    }
  } else {
    data = {}
  }
  str += 'key=72a146fa77a35daed0b5878e0f78786a';
  data.sign = md5(str);
  return data
}
function wxNav(url, data) {
  if (data) {
    let str = url + '?'
    for (var key in data) {
      str += key + '=' + data[key] + '&'
    }
    str = str.slice(0, str.length - 1)
    wx.navigateTo({
      url: str
    })
  } else {
    wx.navigateBack({
      delta: url
    })
  }
}
function img(url, data, de, avatar) { // 单图上传
  var http = 'https://www.gxfcbj.com/' + url;
  var imgdat = sign(de);
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: http, 
      filePath: data,
      name: avatar,
      formData: imgdat,
      success: function (res) {
        var data = res.data
        resolve(res)
      },
      fail: function (res) {
        reject(reject)
      }
    })
  })

}
function up( data, de, avatar) { // 单图上传
 
  var imgdat = sign(de);
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'https://www.gxfcbj.com/v/web/index.php/interfaces/bbs/send',
      filePath: data,
      name: avatar,
      formData: imgdat,
      success: function (res) {
        var data = res.data
        resolve(res)
      },
      fail: function (res) {
        reject(reject)
      }
    })
  })

}

//  function up(data) {   // 多图上传
//    console.log(data)
//    var that = this;
//    if (data.path != null){
//    var imgdat = sign(data.data),
//      i = data.i ? data.i : 0,//当前上传的哪张图片
//      success = data.success ? data.success : 0,//上传成功的个数
//      fail = data.fail ? data.fail : 0;//上传失败的个数
//    wx.uploadFile({
//      header: {
//        'content-type': 'application/x-www-form-urlencoded' // 默认值
//      },
//      url: 'https://www.gxfcbj.com/v/web/index.php/interfaces/bbs/send' ,
//      filePath: JSON.stringify(data.path),
//      name: 'pic_list',//这里根据自己的实际情况改
//      formData: imgdat,//这里是上传图片时一起上传的数据
//      success: (resp) => {
//        console.log(resp.data, '返回码')
//        success++;//图片上传成功，图片上传成功的变量+1
//        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
//      },
//      fail: (res) => {
//        fail++;//图片上传失败，图片上传失败的变量+1
//        console.log('fail:' + i + "fail:" + fail);
//        console.log(res)
//      },
//      complete: () => {
//        i++;//这个图片执行完上传后，开始上传下一张
//        if (i == data.path.length) {   //当图片传完时，停止调用          
//          console.log('执行完毕');
//          console.log('成功：' + success + " 失败：" + fail);
//        } else {//若图片还没有传完，则继续调用函数
//          console.log(i);
//          data.i = i;
//          data.success = success;
//          data.fail = fail;
//          that.up(data);
//        }
//      }
//    });
//  }else{

//      wx.request({
//        url: 'https://www.gxfcbj.com/v/web/index.php/interfaces/bbs/send', //仅为示例，并非真实的接口地址
//        data: sign(data.data),
//        method: 'POST',
//        header: {
//          'content-type': 'application/x-www-form-urlencoded' // 默认值
//        },
//        success: function (res) {
       
//          that.nav('asdasd')
//        },
//        fail: function (err) {
//          console.log(err.data)
//        }
//      })

//  }
// }



const request = {
  getdata: getData,
  nav: wxNav,
  imgdata: img,
  up:up
}
export default request