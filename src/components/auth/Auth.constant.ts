import { RouterQueryEnum } from './Auth.enum'

export const AUTH_TYPE_OPTIONS = {
  [RouterQueryEnum.REGISTRATION]: {
    id: RouterQueryEnum.REGISTRATION,
    hasEmail: true,
    hasPassword: true,
    hasConfirmedPassword: false,
    hasUsername: true,
    hasPasswordValidation: true,
    title: 'Registration',
    toAuthLinks: [{
      href: '/auth',
      title: 'Have an account?'
    }]
  },
  [RouterQueryEnum.FORGOT_PASSWORD]: {
    id: RouterQueryEnum.FORGOT_PASSWORD,
    hasEmail: true,
    hasPassword: false,
    hasConfirmedPassword: false,
    hasUsername: false,
    hasPasswordValidation: false,
    title: 'Forgot Password',
    toAuthLinks: [{
      href: '/auth',
      title: 'Remember your password?'
    }]
  },
  [RouterQueryEnum.LOGIN]: {
    id: RouterQueryEnum.LOGIN,
    hasEmail: true,
    hasPassword: true,
    hasConfirmedPassword: false,
    hasUsername: false,
    hasPasswordValidation: false,
    title: 'Login',
    toAuthLinks: [{
      href: `/auth?type=${RouterQueryEnum.REGISTRATION}`,
      title: 'Don\'t have an account?'
    }, {
      href: `/auth?type=${RouterQueryEnum.FORGOT_PASSWORD}`,
      title: 'Forgot your password?'
    }]
  }
}

export const AUTH_TRANSITION_TIME = 300