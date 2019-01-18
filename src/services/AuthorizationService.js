import Vue from 'vue'
import _ from 'lodash'

export default class AuthorizationService {
  async check (next) {
    if (!localStorage.getItem('currentUser')) {
      let res = await Vue.http.get(process.env.AUTH_URL, { credentials: true })

      if (!_.isEmpty(res.body.user)) {
        localStorage.setItem('currentUser', JSON.stringify(res.body.user))
        localStorage.setItem('jwt', JSON.stringify(res.body.token))
        window.location.reload()
      } else {
        const returnTo = window.location.href
        const URL = `${process.env.AUTH_URL}/auth/google?returnTo=${returnTo}`
        window.location.href = URL
      }
    }

    next()
  }
}
