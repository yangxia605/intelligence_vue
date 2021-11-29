import request from '../utils/request'
import axios from 'axios'

export function getTopicInfo(topicID) {
  return request({
    url: '/topics/' + topicID,
    method: 'get'
  })
}

export function cancelFav(topicID) {
  return request({
    url: '/cancel-favorite-topic/' + topicID,
    method: 'delete'
  })
}

export function addFav(topicID) {
  return request({
    url: '/favorite-topic/' + topicID,
    method: 'post'
  })
}

export function submitAnswer(data) {
  return request({
    url: '/answer',
    method: 'post',
    data: data,
  })
}

export function getAnswerStatus(answerId) {
  return request({
    url: '/answer-status/' + answerId,
    method: 'get',
  })

}

export function searchbyPName(keywords,pageRequest ) {
  return request({
    url: '/getByPName',
    method: 'post',
    params: keywords,
    data: pageRequest
  })

}

export function getDiscussionByTopicId(topicID) {
  return request({
    url: '/getDiscussionByTopicId/' + topicID,
    method: 'get'
  })
}

export function giveOneLike(data) {
  return request({
    url: '/giveOneLike',
    method: 'post',
    data: data
  })
}

export function addNewDiscussion(data) {
  return request({
    url: '/addNewDiscussion',
    method: 'post',
    data: data
  })
}
