export type NavigationsType = Array<{
  named: string
  path?: string
}>

export const navWithoutAuth: NavigationsType = [
  {
    named: 'Login',
    path: '/auth'
  }
]

export const navWithAuth: NavigationsType = [
  {
    named: 'New',
    path: '/new-post'
  },
  {
    named: 'Dashboard',
    path: '/dashboard'
  },
  {
    named: 'Feed',
    path: '/feed'
  },
  {
    named: 'Profile',
    path: '/profile'
  },
  {
    named: 'Logout'
  }
]