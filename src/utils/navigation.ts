export type NavigationsType = Array<{
  name: string;
  path: string
}>

export const navWithoutAuth: NavigationsType = [
  // {
  //   name: 'Home',
  //   path: '/'
  // },
  {
    name: 'Login',
    path: '/auth'
  }
]

export const navWithAuth: NavigationsType = [
  // {
  //   name: 'Home',
  //   path: '/'
  // },
  {
    name: 'Dashboard',
    path: '/dashboard'
  }
]