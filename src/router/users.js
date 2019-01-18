import Users from '@/components/Users'
import listUsers from './users/list'
import newUser from './users/new'
import editUser from './users/edit'

export default (auth) => {
  return {
    path: '/users',
    component: Users,
    beforeEnter: async (to, from, next) => {
      await auth.check(next)

      let currentUser = JSON.parse(localStorage.getItem('currentUser'))

      if (currentUser.roles.indexOf('admin') === -1) {
        next('/')
      }
    },
    children: [
      listUsers,
      newUser,
      editUser
    ]
  }
}
