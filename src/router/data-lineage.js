import DataLineage from '@/components/DataLineage'

export default (auth) => {
  return {
    path: '/data-lineage/:source',
    name: 'DataLineage',
    component: DataLineage,
    beforeEnter: async (to, from, next) => { await auth.check(next) }
  }
}
