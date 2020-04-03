import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import filters from './modules/filters'
import loading from './modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    filters,
    loading
  }
})
