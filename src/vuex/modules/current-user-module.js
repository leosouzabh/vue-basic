import state from './states/current-user-state'
import mutations from './mutations/current-user-mutations'
import getters from './getters/current-user-getters'
import actions from './actions/current-user-actions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
