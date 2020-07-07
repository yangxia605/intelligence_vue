import request from '../utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

// 获取收藏题目
export function getfavoritetopics(token) {
  return request({
    url: '/favoritetopics',
    method: 'get',
    params: { token }
  })
}

export function getAllTopics() {
  return request({
    url: '/alltopics',
    method: 'get',
  })
}
