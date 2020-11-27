import request from '@/utils/request'
const baseUrl = process.env.VUE_APP_BASE_API;

export function getList(data) {
  return request({
    url: `${baseUrl}/article`,
    method: 'post',
    data
  })
}

export function addArticle(data) {
  return request({
    url: `${baseUrl}/article/add`,
    method: 'post',
    data
  })
}

export function editArticle(data) {
  return request({
    url: `${baseUrl}/article/editArticle`,
    method: 'post',
    data
  })
}

export function deleteArticle(data) {
  return request({
    url: `${baseUrl}/article/deleteArticle`,
    method: 'post',
    data
  })
}