export default {
  namespaced: true,
  state: {
    budgetDetail: false
  },
  mutations: {
    setBudgetDetail (state, payload) {
      state.budgetDetail = payload
    }
  }
}
