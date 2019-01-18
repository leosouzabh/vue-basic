export default {
  setSchema: ({commit}, schema) => { commit('SET_SCHEMA', schema) },
  setSchemaDetails: ({commit}, schemaDetails) => {
    commit('SET_SCHEMA_DETAILS', schemaDetails)
  }
}
