import request from '@/utils/request'
const baseUrl = process.env.VUE_APP_BASE_API;

export function getList() {
  return request({
    url: `${baseUrl}/article`,
    method: 'get'
  })
}

export function addArticle(data) {
  return request({
    url: `${baseUrl}/article/add`,
    method: 'post',
    data
  })
}