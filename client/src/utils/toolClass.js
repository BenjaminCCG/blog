import router from '@/router'

/**
 * 工具类，用于封装通用方法
 */
class toolClass {
  // eslint-disable-next-line space-before-function-paren
  constructor() {
    // console.log('toolClass be instantiation')
  }

  /**
   * 日期转换
   * @param {Date} timestamp 可被js的Date对象转化的日期对象或时间戳
   * @param {String} fmt 日期格式，默认：yyyy-MM-dd hh:mm
   * @return {String} 日期格式字符串
   */
  dateFormat(timestamp, fmt) {
    if (!timestamp) {
      return ''
    }
    if (!fmt) {
      fmt = 'yyyy-MM-dd hh:mm:ss'
    }
    let date = new Date(timestamp)
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }

  /**
   * 秒转时分秒
   * @param {Number} seconds 秒
   * @return {String} 日期格式字符串
   */
  secondsToTime(seconds) {
    if (!seconds) {
      return '00:00:00'
    }
    seconds = parseInt(seconds)
    let data
    if (seconds < 60) {
      data = `00:00:${seconds >= 10 ? seconds : '0' + seconds}`
    } else if (seconds > 60 && seconds < 3600) {
      let m = parseInt(seconds / 60)
      let s = seconds % 60
      data = `00:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`
    } else {
      let h = parseInt(seconds / 3600)
      let m = parseInt((seconds % 3600) / 60)
      let s = seconds % 60
      data = `${h >= 10 ? h : '0' + h}:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`
    }
    return data
  }

  /**
   * 获取Url参数
   * @param {String} urls 链接
   * @return {Object} url中'?'符后的参数
   */
  UrlSearch(urls) {
    let url = urls // 获取url中'?'符后的字串
    let theRequest = {}
    if (url.indexOf('?') !== -1) {
      let str = url.substr(1)
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    return theRequest
  }

  /**
   * caculate the great circle distance
   * 经纬度计算两点间距离
   * @param {Number} lat1 点1经度
   * @param {Number} lng1 点1纬度
   * @param {Number} lat2 点2经度
   * @param {Number} lng2 点2纬度
   * @return {Number} 距离（单位：米）
   */
  getGreatCircleDistance(lat1, lng1, lat2, lng2) {
    if (lat1 === lat2 && lng1 === lng2) {
      return 0
    }
    let EARTH_RADIUS = 6378137.0 // 单位M
    let PI = Math.PI
    let radLat1 = (lat1 * PI) / 180.0
    let radLat2 = (lat2 * PI) / 180.0
    let a = radLat1 - radLat2
    let b = (lng1 * PI) / 180.0 - (lng2 * PI) / 180.0
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * EARTH_RADIUS
    s = Math.round(s * 10000) / 10000.0
    // console.log(s)
    return s
  }

  /**
   * 用于解决微信公众号中，低版本手机浏览器bug:键盘下沉后，webView未跟着一起下沉，悬浮在页面中
   * 此方法需放到页面渲染完成后执行(nextTick)
   */
  blur() {
    let input = document.getElementsByTagName('input')
    let textarea = document.getElementsByTagName('textarea')
    for (let i = 0; i < input.length; i++) {
      input[i].onblur = () => {
        let currentPosition, timer
        let speed = 1 // 页面滚动距离
        timer = setInterval(function () {
          currentPosition =
            document.documentElement.scrollTop || document.body.scrollTop
          currentPosition -= speed
          window.scrollTo(0, currentPosition) // 页面向上滚动
          currentPosition += speed // speed变量
          window.scrollTo(0, currentPosition) // 页面向下滚动
          clearInterval(timer)
        }, 1)
      }
    }
    for (let i = 0; i < textarea.length; i++) {
      textarea[i].onblur = () => {
        let currentPosition, timer
        let speed = 1 // 页面滚动距离
        timer = setInterval(function () {
          currentPosition =
            document.documentElement.scrollTop || document.body.scrollTop
          currentPosition -= speed
          window.scrollTo(0, currentPosition) // 页面向上滚动
          currentPosition += speed // speed变量
          window.scrollTo(0, currentPosition) // 页面向下滚动
          clearInterval(timer)
        }, 1)
      }
    }
  }

  /**
   * 用于解决安卓手机弹出键盘后，input被键盘遮挡的问题
   * 此方法需放到页面渲染完成后执行(nextTick)
   */
  scrollIntoViewIfNeeded() {
    if (/Android/gi.test(navigator.userAgent)) {
      window.addEventListener('resize', function () {
        if (
          document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA'
        ) {
          window.setTimeout(function () {
            document.activeElement.scrollIntoViewIfNeeded()
          }, 0)
        }
      })
    }
  }

  /**
   * 浏览器改变大小时调用函数
   * @param {Function} callback 回调函数
   */
  windowResizeEvent(callback) {
    window.onresize = function () {
      let target = this
      if (target.resizeFlag) {
        clearTimeout(target.resizeFlag)
      }
      target.resizeFlag = setTimeout(function () {
        callback()
        target.resizeFlag = null
      }, 100)
    }
  }

  /**
   * 获取微信授权所需url
   * @return {String} url
   */
  getAuthURL() {
    var authURL = window.location.href.split('?')[0]
    if (authURL.indexOf('#') > -1) {
      authURL = authURL.substring(0, authURL.indexOf('#'))
    }
    return authURL
  }

  /**
   * 单文件上传通用方法
   * @param {*} item // file对象
   * @param {*} type // 单文件上传或者多文件上传，默认单文件
   */
  upload(item, type) {
    let url = null
    let data = null
    if (type === 'multiple') {
      url = api.file.multiple
      data = item
    } else {
      url = api.file.single
      data = {
        file: item.file
      }
    }
    return new Promise((resolve, reject) => {
      http({
        ...url,
        headerData: 'FormDate',
        data
      })
        .then(res => {
          if (item.onSuccess) {
            item.onSuccess(res.data, item.file)
          }
          resolve(res.data)
        })
        .catch(reject)
    })
  }

  /**
   * 复制文本到粘贴板(兼容ios,android)
   * @param {String} message // 需要复制的文本
   */
  copy(message) {
    let input = document.createElement('input')
    input.value = message
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, input.value.length)
    document.execCommand('Copy')
    document.body.removeChild(input)
  }

  beforeUpload(file) {
    return true
    // return new Promise((resolve, reject) => {
    //   let w = store.state.app.picSize.w
    //   let h = store.state.app.picSize.h
    //   if ('image'.indexOf(file.type) > -1) {
    //     Message({
    //       type: 'error',
    //       message: `请上传${w}像素*${h}像素尺寸的图片`
    //     })
    //     reject(new Error('error'))
    //   }
    //   var reader = new FileReader()
    //   reader.onload = function (e) {
    //     var data = e.target.result
    //     // 加载图片获取图片真实宽度和高度
    //     var image = new Image()
    //     image.onload = function () {
    //       var width = image.width
    //       var height = image.height
    //       console.log(width)
    //       console.log(height)
    //       if (width === w && height === h) {
    //         resolve()
    //       } else {
    //         Message({
    //           type: 'error',
    //           message: `请上传${w}像素*${h}像素尺寸的图片`
    //         })
    //         reject(new Error('error'))
    //       }
    //     }
    //     image.src = data
    //   }
    //   reader.readAsDataURL(file)
    // })
  }

  judgeClient() {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      return 'Android'
    } else if (isIOS) {
      return 'IOS'
    } else {
      return 'PC'
    }
  }

  routerPush({ name = '', query = {}, title = '' }) {
    let queryData = []
    for (let key in query) {
      queryData.push(`${key}=${query[key]}`)
    }
    if (this.judgeClient() === 'Android') {
      if (window.App) {
        window.App.getPush(encodeURI(`${window.location.origin}${window.location.pathname}#/${name}?${queryData.join('&')}`), title)
      } else {
        // console.log(`${window.location.origin}${window.location.pathname}#/${name}?${queryData.join('&')}`)
        router.push({ name, query })
      }
    } else if (this.judgeClient() === 'IOS') {
      if (window.webkit) {
        window.webkit.messageHandlers.getPush.postMessage({
          path: encodeURI(`${window.location.origin}${window.location.pathname}#/${name}?${queryData.join('&')}`),
          title: decodeURIComponent(title)
        })
      } else if (window.App) {
        window.App.getPush(encodeURI(`${window.location.origin}${window.location.pathname}#/${name}?${queryData.join('&')}`), title)
      } else {
        // console.log(`${window.location.origin}${window.location.pathname}#/${name}?${queryData.join('&')}`)
        router.push({ name, query })
      }
    } else {
      // console.log(`${window.location.origin}${window.location.pathname}#/${name}?${queryData.join('&')}`)
      router.push({ name, query })
    }
  }

  goBack() {
    if (this.judgeClient() === 'Android') {
      if (window.App) {
        window.App.goBack()
      } else {
        router.go(-1)
      }
    } else if (this.judgeClient() === 'IOS') {
      if (window.webkit) {
        window.webkit.messageHandlers.goBack.postMessage('')
      } else if (window.App) {
        window.App.goBack()
      } else {
        router.go(-1)
      }
    } else {
      router.go(-1)
    }
  }
  /**
   * @description 判断苹果、安卓、pc
   * @author cjg
  */
  modelType() {
    let type = ''
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
      type = 'iOS'
    } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
      type = 'Android'
    } else { //pc
      type = pc
    }
    return type
  }
  /**
 * 获取Url参数
 * @param {String} urls 链接
 * @return {Object} url中'?'符后的参数
 */
  UrlSearch(urls) {
    let url = urls // 获取url中'?'符后的字串
    let theRequest = {}
    if (url.indexOf('?') !== -1) {
      let str = url.substr(1)
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    return theRequest
  }
  /**
   * @description 判断是否是pc
   * @author cjg
  */
  isMobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  //字符串转16进制
  Hexadecimal(val) {
    let temp = val;
    let ByteCount = 0;
    let newStr = '';
    if (val) {
      for (let i = 0; i < temp.length; i++) {
        ByteCount = temp.charCodeAt(i);
        if (ByteCount.length == 1) {
          ByteCount = "0" + ByteCount
        }
        ByteCount = ByteCount.toString(16).toUpperCase();
        newStr += ByteCount;
      }
      return newStr
    }
  }
    /**
     * @description base64转blob or file
     * base64只是字节的编码方式.文件是字节的数据集.
     * 想要转成文件,那么就只需要解码成字节数组,然后通过字节流写成文件
     * @param {String} base64Data 字节编码
     * @param {String} filename 自定义文件名称(须带有文件后缀 如.png .text等)
     * @author cjg
    */
   base64ToBlob(base64Data, filename) {
    let arr = base64Data.split(","),
      fileType = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      l = bstr.length,
      u8Arr = new Uint8Array(l);
    while (l--) {
      u8Arr[l] = bstr.charCodeAt(l);
    }
    let blob = new Blob([u8Arr],{
      type: fileType,
    });
    let name = this.getrandomcode(8)+'png'
    if(filename !== '') {
      name = filename
    }
    //blob无法设置filename但file可以
    return new File([blob], name);
  }
  /**
   * @description 获取随机数
   * @param {Number} count 可为空,默认四位数
   * @author cjg
  */
  getrandomcode(count){
    let identifyCodes ="1234567890"
    let value = ''
    let countNum = 4
    if(count !== '') {
      countNum = Number(count)
    }
    for (let i = 0; i < countNum; i++) {
      value += identifyCodes[
        // this.randomNum(0, this.identifyCodes.length)
        Math.floor(Math.random() * (identifyCodes.length - 0) + 0)
      ];
    }
    return value
  }
  /**
   * @description 获取年月日时分秒拼接
   * @author cjg
  */
  getDayNum() {
    let today = new Date()
    let tYear = today.getFullYear()<10?'0'+today.getFullYear():today.getFullYear();
    let tMonth = today.getMonth()<10?'0'+today.getMonth():today.getMonth();
    let tDate = today.getDate()<10?'0'+today.getDate():today.getDate();
    let tHours = today.getHours()<10?'0'+today.getHours():today.getHours();
    let tMinutes = today.getMinutes()<10?'0'+today.getMinutes():today.getMinutes();
    let tSeconds = today.getSeconds()<10?'0'+today.getSeconds():today.getSeconds();
    return tYear+''+tMonth+''+tDate+''+tHours+''+tMinutes+''+tSeconds
  }
  /**
   * @description ip转16进制
   * @author cjg
  */
  ipToStr(str) {
    if(!str) {
      return;
    }
    let ip = ''
    str = str.split(".");
    str.map((item,index) => {
      let code = Number(item).toString(16)<10?'0'+Number(item).toString(16):('abcdef').indexOf(Number(item).toString(16))>-1?'0'+Number(item).toString(16):Number(item).toString(16)
      ip+=index>=str.length-1?code:code
    })
    return ip
  }
  /**
   * @description 16进制转字符串(ip)
   * @author cjg
  */
  HexToStr(str) {
    if (str&&str.length % 2 != 0) {
      console.log('必须为偶数');
      return ;
    }
    let string = '';
    for (var i = 0; i < str.length; i = i + 2) {
      let code = parseInt(str.substr(i, 2), 16);
      string+=i<str.length-2?code+'.':code
    }
    return string;
  }
  /**
   * @description 16进制转ASCII码
   * @author cjg
  */
  strTocharCode(str) {
    if(!str) {
      return;
    }
    let ASCII = [];
    for (let i = 0; i < str.length; i++) {
      ASCII.push((str.charCodeAt(i)).toString(16));
    }
    return ASCII.join("");
  }
  /**
   * @description ASCII码转16进制
   * @author cjg
  */
  charCodeToStr(str) {
    if(!str) {
      return;
    }
    let string = '';
    for (var i = 0; i < str.length; i = i + 2) {
      let code = parseInt(str.substr(i, 2), 16);
      string+=String.fromCharCode(code)
    }
    return string;
  }
  /**
   * @deprecated 蓝牙指令读入,转ASCII码
   * @param {Object} code 16进制 可传入字符串和数组 当存在ip格式的数据时建议传入数组类型
   * @author cjg
  */
  setBluetoothCode(code) {
    if(this.isArray(code)) { //数组格式
      let data = ''
      code.map(item => {
        if(item.indexOf('.')>-1) {
          data+=this.strTocharCode(this.ipToStr(item))
        } else {
          data+=this.strTocharCode(item)
        }
      })
      data = '0b'+data+'0d'
      return data
    } else { //字符串格式
      let data = '0b'+this.strTocharCode(code)+'0d'
      return data
    }
  }
  /**
   * @description 16进制转10进制
   * @author cjg
  */
  hexToInt(hex) {
    var len = hex.length, a = new Array(len), code;
    for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48<=code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }
    return a.reduce(function(acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
  }
  /**
   * @description 10进制转16进制
   * @author cjg
  */
  intToHex(num, width) {
    var hex = "0123456789abcdef";
    var s = "";
    while (num) {
      s = hex.charAt(num % 16) + s;
      num = Math.floor(num / 16);
    }
    if (typeof width === "undefined" || width <= s.length) {
      return "0x" + s;
    }
    var delta = width - s.length;
    var padding = "";
    while(delta-- > 0) {
      padding += "0";
    }
    return "0x" + padding + s;
  }
  /**
   * @description 应答指令解析为16进制
   * @param {String} code ASCII码
   * @param {String} type 类型 1取序列号和IP及状态
   * @author cjg
  */
  receiveCodeTOStr(type, code) {
    let data = code.substr(2, code.length-4)
    //读取序列号、IP及状态应答 // 设置参数应答
    let a = data
    let types
    if(type=='1') {
       types = [
        {name: '命令', length: 4},{name: '序列号', length: 16},{name: '服务器IP', length: 16, toIP: true},{name: '读卡器IP', length: 16},{name: '读卡器网关', length: 16},{name: '读卡器掩码', length: 16},{name: '网络状态', length: 4},{name: '固件版本', length: 8},{name: '硬件版本', length: 8},{name: '校验和', length: 8}
      ]
    } else if(type=='2') {
       types = [
        {name: '命令', length: 4},{name: '状态', length: 4},{name: '校验和', length: 8}
      ]
    } else if(type=='3') {
      types = [
        {name: '命令', length: 4},{name: '长度', length: 8},{name: '读卡器序号', length: 16},{name: '序号', length: 8},{name: '标签数量', length: 4},{name: '校验和', length: 8}
      ]
      let arr = []
      for(let i = 0; i< Number(this.hexToInt(this.charCodeToStr(code.substr((2+4+8+16+8), 4)))); i++) {
        arr.push({name: '标签ID'+(i+1), length: 20})
      }
      types.splice(5, 0, ...arr);
    }
    let isErr = true //用于分辨拼包情况
    types.map(item => {
      if(a.length<item.length) { //拼包情景
        isErr = false
      }
      if(isErr) {
        if(item.toIP ===true) {
          item.code = this.HexToStr(this.charCodeToStr(a.substr(0, item.length))+'')
        } else {
          if(item.name.indexOf('标签ID')>-1) {
            item.code = this.charCodeToStr(a.substr(0, item.length)).substr(2, 8) //this.hexToInt()
          } else {
            item.code = this.charCodeToStr(a.substr(0, item.length))
          }
        }
        a=a.substr(item.length, a.length)
      }
    })
    return types
  }
  /**
   * @description 判断是否为数组类型
   * @author cjg
  */
  isArray(obj) {
    // https://www.cnblogs.com/wssdx/p/8086741.html
    return (typeof obj=='object')&&obj.constructor==Array;
  }
  /**
   * @description 对象数组去重
   * @param {Array} arr 数组
   * @param {String} name 去重属性
   * @author cjg
  */
  unArray(arr, name) {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr[name]) && res.set(arr[name], 1));
  }
  /**
   * @description 字符串分割 限用于蓝牙 后续完善该方法
   * @param {String} s 字符串
   * @author cjg
  */
  strSplit(s) {
    if(!s) {
      return false;
    }
    var reg=/.{20}/g;
    var rs=s.match(reg);//注意如果s的长度小于4,那么rs=null
    rs.push(s.substring(rs.join('').length));
    return rs
  }
  //是否是开发环境
  isDevelopment() {
    return window.location.href.indexOf('localhost')>-1? true : false
  }
  /**
   * @description 文本过滤
   * @param {string} value 文本
   * @param {string} i 过滤类型
   * @author cjg
   * 使用案例：@input="value=toolClass.validForbidCode(value, '1')"
   * (/[^\X]/g,'')  替换X  ====>>  中文u4E00-u9FA5，数字0-9，英文a-z\A-Z，其它符号@、点或其它符号。也可以多个，用\隔开就行了
   * 例如：中英文 + 数字 + '@'符号 + 点符号   \a-\z\A-\Z0-9\u4E00-\u9FA5\@\.
   */
  validForbidCode(value, i) {
    if (i == '1') { // 纯数字输入
      value = value.replace(/[^\d]/g, '').replace(/\s/g, "") // 或者 replace(/[^0-9]/g,'')
      return value;
    } else if(i == '2') { // 纯英文输入
      value = value.replace(/[^\a-\z\A-\Z]/g,'')
    } else if (i == '3') { // 纯中文
      value = value.replace(/[^\u4E00-\u9FA5]/g,'')
      return value;
    } else if (i == '4') { // 非中文输入
      value = value.replace(/[\u4e00-\u9fa5]/ig, '').replace(/\s/g, "")
      return value;
    } else if (i == '5') { // 数字+小数点
      value = value.replace(/[^\0-9\.]/g,'')
      return value;
    } else if (i == '6') { // 数字+英文
      value = value.replace(/[\W]/g, '').replace(/\s/g, "") // 或者 replace(/[^\a-\z\A-\Z0-9]/g,'')
      return value;
    } else if (i == '7') { // 中文+英文+数字
      value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
      return value;
    } else if (i == '8') { // 中文+英文+数字+空格
      value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g,'')
      return value;
    } else if (i == '9') { //中文+英文+数字+小数点
      value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g,'')
      return value;
    }
  }
}
export default toolClass
