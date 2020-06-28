import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_IS_AUTHENTICATED: 'SET_IS_AUTHENTICATED',
  SET_USER: 'SET_USER'
}
export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {},
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
  },
  mutations: {
    [types.SET_IS_AUTHENTICATED](state, isAutnenticated) {
      if (isAutnenticated)
        state.isAutnenticated = isAutnenticated
      else
        state.isAutnenticated = false
    },
    [types.SET_USER](state, user) {
      if (user) {
        state.user = user
        console.log(user);
        console.log(state.user);
      }
      else
        state.user = {}
    }
  },
  actions: {
    setIsAutnenticated: ({ commit }, isAutnenticated) => {
      commit(types.SET_IS_AUTHENTICATED, isAutnenticated)
    },
    setUser: ({ commit }, user) => {
      commit(types.SET_USER, user)
    },
    clearCurrentState: ({ commit }) => {
      commit(types.SET_IS_AUTHENTICATED, false)
      commit(types.SET_USER, null)
    }
  }
})
