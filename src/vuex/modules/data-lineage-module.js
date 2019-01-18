import state from './states/data-lineage-state'
import mutations from './mutations/data-lineage-mutations'
import getters from './getters/data-lineage-getters'
import actions from './actions/data-lineage-actions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
