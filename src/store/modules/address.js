const state = {
  address: {}
}
const mutations = {
  SET_ADDRESS: (state, address) => {
    state.address = address
  }
}
const actions = {
  setAddress({ commit }, data) {
    commit('SET_ADDRESS', data)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
