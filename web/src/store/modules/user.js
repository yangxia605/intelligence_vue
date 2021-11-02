import { login, logout, register } from '../../api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
import { resetRouter } from '../../router'

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
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        const accessToken = res.accessToken
        commit('SET_TOKEN', accessToken)
        setToken(accessToken)
        localStorage.setItem('authorization',accessToken);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
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

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

