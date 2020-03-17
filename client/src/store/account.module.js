import { userServices } from '../services'
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'))
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

const actions = {
  async login ({ dispatch, commit }, { email, password }) {
    commit('loginRequest', { email })

    try {
      const user = await userServices.login(email, password)
      commit('loginSuccess', user)
      router.push('/')
    } catch (error) {
      commit('loginFailure')
      dispatch('alert/error', error.response.data.message, { root: true })
    }
  },
  logout ({ commit }) {
    userServices.logout()
    commit('logout')
  },
  async register ({ dispatch, commit }, user) {
    commit('registerRequest', user)

    try {
      await userServices.register(user)
      commit('registerSuccess')
      router.push('/login')
      setTimeout(() => {
        dispatch('alert/success', 'Registration successful', { root: true })
      })
    } catch (error) {
      commit('registerFailure')
      dispatch('alert/error')
    }
  }
}

const mutations = {
  loginRequest (state, user) {
    state.status = { loggingIn: true }
    state.user = user
  },
  loginSuccess (state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginFailure (state) {
    state.status = {}
    state.user = null
  },
  logout (state) {
    state.status = {}
    state.user = null
  },
  registerRequest (state) {
    state.status = { registering: true }
  },
  registerSuccess (state) {
    state.status = {}
  },
  registerFailure (state) {
    state.status = {}
  }
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
}
