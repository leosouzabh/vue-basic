import state from './states/cytoscape-state'
import mutations from './mutations/cytoscape-mutations'
import getters from './getters/cytoscape-getters'
import actions from './actions/cytoscape-actions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
