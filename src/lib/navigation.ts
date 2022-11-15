type NavigationsType = Array<{
  name: string;
  path: string;
}>

export const navWithoutAuth: NavigationsType = [
  // {
  //   name: 'Home',
  //   path: '/'
  // },
  {
    name: 'Login',
    path: '/api/auth/login'
  }
]

export const navWithAuth: NavigationsType = [
  // {
  //   name: 'Home',
  //   path: '/'
  // },
  {
    name: 'Logout',
    path: '/api/auth/logout'
  },
  {
    name: 'Dashboard',
    path: '/dashboard'
  }
]