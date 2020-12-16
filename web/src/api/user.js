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
    url: '/register',
    method: 'get',
    params: data
  })
}

// 用户忘记密码接口
export function forget(data) {
  return request({
    url: '/forget',
    method: 'post',
    params: data
  })
}



