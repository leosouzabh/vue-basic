import _ from 'lodash'

const BASE_URL = `${process.env.URL}`
const usersUrl = `${BASE_URL}/users`
const jwt = JSON.parse(localStorage.getItem('jwt') || '{}')
const options = { credentials: true }

if (!_.isEmpty(jwt)) {
  options.headers = { 'Authorization': jwt.token }
}

const get = (http, endpoint) => http.get(endpoint, options)
const post = (http, data) => http.post(usersUrl, data, options)
const destroy = (http, id) => http.delete(`${usersUrl}/${id}`, options)
const put = (http, id, data) => http.put(`${usersUrl}/${id}`, data, options)

export default class UsersService {
  constructor (http) {
    this.http = http
    let currentUser = localStorage.getItem('currentUser') || '{}'
    this.currentUserId = JSON.parse(currentUser)._id || null
  }

  currentUser = (cb) => {
    if (this.currentUserId) {
      this.getUser(this.currentUserId).then((res) => {
        cb(res.body.user)
      })
    }
  }

  listUsers = () => get(this.http, usersUrl)
  createUser = (data) => post(this.http, data)
  updateUser = (id, data) => put(this.http, id, data)
  getUser = (id) => get(this.http, `${usersUrl}/${id}`)
  destroyUser = (id) => destroy(this.http, id)
}
