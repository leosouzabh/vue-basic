import Vue from 'vue'
import moment from 'moment'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import AuthorizationService from '@/services/AuthorizationService'

import users from './users'
import errors from './errors'
import defaultRoute from './default'
import dataLineage from './data-lineage'

import 'vue-material/dist/vue-material.min.css'

Vue.use(Router)
Vue.use(VueResource)

Vue.filter('formatDate', (val) => {
  if (val) { return moment(String(val)).format('MM/DD/YYYY hh:mm') }
  return '[EMPTY]'
})

const auth = new AuthorizationService()

export default new Router({
  mode: 'history',
  routes: [
    errors,
    users(auth),
    defaultRoute,
    dataLineage(auth)
  ]
})
