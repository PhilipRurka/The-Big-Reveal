export type NavigationsType = Array<{
  name: string;
  path: string
}>

export const navWithoutAuth: NavigationsType = [
  {
    name: 'Login',
    path: '/auth'
  }
]

export const navWithAuth: NavigationsType = [
  {
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    name: 'Feed',
    path: '/feed'
  },
  {
    name: 'Profile',
    path: '/profile'
  }
]