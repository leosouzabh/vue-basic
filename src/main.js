// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */

import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'

import App from './App'
import router from './router'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

Vue.http.interceptors.push((req, next) => {
  next((res) => {
    return { ...res, ok: true }
  })
})

Vue.use(Vuex)
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

sync(store, router)
