export default {
  namespaced: true,
  state: {
    budget: null
  },
  mutations: {
    setBudgetFilters (state, payload) {
      state.budget = payload
    }
  }
}
