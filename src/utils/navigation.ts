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
    name: 'Profile',
    path: '/profile'
  }
]