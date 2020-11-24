import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo:{},
    menu:[]
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
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data ,token} = response
        commit('SET_TOKEN', token)
        commit('SET_USERINFO', data)
        // setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


  // user logout
  logout({ commit, state, dispatch }) {
    // return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        commit('RESET_STATE')
        // resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    // })
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

