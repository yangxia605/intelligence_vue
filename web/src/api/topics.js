import request from '../utils/request'
import axios from 'axios'

export function getTopicInfo(topicInfo) {
  return request({
    url: '/topics/' + topicInfo,
    method: 'get'
  })
}

