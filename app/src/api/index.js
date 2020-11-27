import request from '@/utils/request'
const baseUrl = process.env.VUE_APP_BASE_URL;

export function getWeather(city) {
  return request({
    url: `http://wthrcdn.etouch.cn/weather_mini?city=`+city,
    method: 'get'
  })
}

export function getArticleList(data){
  return request({
    url: `${baseUrl}/article`,
    method: 'post',
    data
  })
}

export function getArticleDetail(id){
  return request({
    url: `${baseUrl}/article/read/`+id,
    method: 'get'
  })
}

export function likeup(){
  return request({
    url: `${baseUrl}/likeup`,
    method: 'get'
  })
}

export function likecount(){
  return request({
    url: `${baseUrl}/likecount`,
    method: 'get'
  })
}

export function addComment(data){
  return request({
    url: `${baseUrl}/comment/addComment`,
    method: 'post',
    data
  })
}

export function getComment(data){
  return request({
    url: `${baseUrl}/comment/getComment`,
    method: 'post',
    data
  })
}