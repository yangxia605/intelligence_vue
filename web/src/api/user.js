import request from '../utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'get',
    params: data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })

}

// 用户注册接口
export function register(data) {
  return request({
    url: 'http://localhost:8203/register',
    method: 'post',
    params: data
  })
}

// 用户注册接口
export function forget(data) {
  return request({
    url: 'http://localhost:8204/forget',
    method: 'post',
    params: data
  })
}



