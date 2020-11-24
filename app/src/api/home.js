import request from '@/utils/request'
// const baseUrl = process.env.VUE_APP_BASE_API;

export function getWeather(city) {
  return request({
    url: `http://wthrcdn.etouch.cn/weather_mini?city=`+city,
    method: 'get'
  })
}
