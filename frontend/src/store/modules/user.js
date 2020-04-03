import axios from 'axios'
import { getBackendURL } from '../../utils/network'
import { setToken, getToken, axiosJWT, cleanToken, setUserLogo, getUserLogo } from '../../utils/auth'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    user ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.user) {
          resolve()
          return
        }
        if (!getToken()) {
          reject(new Error('No JWT Token'))
          return
        }
        axiosJWT(getBackendURL('users/me'))
          .then(({ data }) => {
            commit(
              'setUser',
              Object.assign({}, data, { logo: { url: getUserLogo() } })
            )
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    login ({ commit }, { id, pass }) {
      return new Promise((resolve, reject) => {
        axios
          .post(getBackendURL('auth/local'), {
            identifier: id,
            password: pass
          })
          .then(({ data }) => {
            commit('setUser', data.user)
            setToken(data.jwt)
            setUserLogo(data.user.logo.url)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout ({ state, commit }) {
      commit('setUser', null)
      cleanToken()
    }
  }
}
