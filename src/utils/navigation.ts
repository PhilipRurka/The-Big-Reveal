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
    named: 'New Post',
    path: '/new-post'
  },
  {
    named: 'Your Space',
    path: '/your-space'
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