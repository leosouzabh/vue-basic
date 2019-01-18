import state from './states/message-bar-state'
import mutations from './mutations/message-bar-mutations'
import getters from './getters/message-bar-getters'
import actions from './actions/message-bar-actions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
