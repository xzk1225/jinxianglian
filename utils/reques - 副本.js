var md5=require('md5.js')
function getData(url, data) {
if(url.url){
  var http = 'http://192.168.0.66:8082/'
}else{
 var http = 'http://192.168.0.66:8081/'
}
  var date = sign(data)

  
  console.log('请求的数据信息', date)
  return new Promise((resolve, reject) => {
    wx.request({
      url:http+url.data , //仅为示例，并非真实的接口地址
      data: date,
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        resolve(res);  //  这里是用的一个promise 在外部调用时候需要用到 。then(data()=>{data.data})
      // if(res.data.code==1000){
      //   resolve(res)
      // }else{
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

function sign(data){
  
  var str='';
  if(data){
    for (var k in data) {
      str += k + '=' + data[k] + '&'
    }
  }else{
    data={}
  }
  
  str +='key=72a146fa77a35daed0b5878e0f78786a';  
  data.sign=md5(str);
  
  return data
}

function wxNav(url,data){
        if(data){
          let str = url + '?'
          for (var key in data) {
            str += key + '=' + data[key] + '&'
          }
          str = str.slice(0, str.length - 1)
          wx.navigateTo({
            url: str
          })
        }else{
          wx.navigateBack({
            delta: url
          })
        }
}
function img(url,data,de){
  var http = 'http://192.168.0.66:8081/'+url;
  var imgdat = sign(de);
  return new Promise((resolve, reject)=>{
    wx.uploadFile({
      url: http, //仅为示例，非真实的接口地址
      filePath: data,
      name: 'avatar',
      formData: imgdat,
      success: function (res) {
        var data = res.data
       resolve(res)
      },
      fail:function(res){
        reject(reject)
      }
    })
  })





  // wx.uploadFile({
  //   url: http, //仅为示例，非真实的接口地址
  //   filePath: data,
  //   name: 'file',
    
  //   success: function (res) {
  //     var data = res.data
  //     //do something
  //   }
  // })
}

const request = {
  getdata: getData,
  nav:wxNav,
  imgdata:img
}
export default request