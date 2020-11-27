  /**
   * 日期转换
   * @param {Date} timestamp 可被js的Date对象转化的日期对象或时间戳
   * @param {String} fmt 日期格式，默认：yyyy-MM-dd hh:mm
   * @return {String} 日期格式字符串
   */
export  function  dateFormat(timestamp, fmt) {
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