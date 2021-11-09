import { getTopicInfo, cancelFav, addFav, submitAnswer, getAnswerStatus, searchbyPName } from '../../api/topics'
import {getToken, removeToken, setToken} from "../../utils/auth";
import {resetRouter} from "../../router";
import {register} from "../../api/user";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  getTopicInfo({ commit }, { topicID }) {
    return new Promise((resolve, reject) => {
      getTopicInfo(topicID ).then(res => {
        //let token = localStorage.getItem('authorization');
        // const data = res
        // if (!data) {
        //   reject('Get Topic failed')
        // }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  cancelFav({ commit }, { topicID }) {
    return new Promise((resolve, reject) => {
      cancelFav(topicID ).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addFav({ commit }, { topicID }) {
    return new Promise((resolve, reject) => {
      addFav(topicID ).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  submitAnswer({ commit }, answerInfo) {
    return new Promise((resolve, reject) => {
      submitAnswer(answerInfo).then(res => {
          resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getAnswerStatus({ commit }, { answerId }) {
    return new Promise((resolve, reject) => {
      getAnswerStatus(answerId ).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // searchbyPName
  searchbyPName({ commit }, searchPNameData) {
    const { keywords, pageRequest } = searchPNameData
    const { page , offset} = pageRequest
    searchbyPName({ keywords: keywords},  { page , offset}).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  },
  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }
  //
  //       const { name, avatar } = data
  //
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
