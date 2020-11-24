import request from '@/utils/request'
const baseUrl = process.env.VUE_APP_BASE_API;

export function login(data) {
  return request({
    url: `${baseUrl}/user/login`,
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: `${baseUrl}/user/register`,
    method: 'post',
    data
  })
}


export function getUsers() {
  return request({
    url: `${baseUrl}/user`,
    method: 'get'
  })
}
