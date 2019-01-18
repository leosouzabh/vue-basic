import Unauthorized from '@/components/Unauthorized'

export default {
  path: '/401',
  name: 'Unauthorized',
  component: Unauthorized,
  beforeEnter: (to, from, next) => {
    if (localStorage.getItem('currentUser')) {
      next('/')
    }
    next()
  }
}
