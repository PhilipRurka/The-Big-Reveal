import AuthContainer from "../src/components/auth/Auth.container";
import { RouterQuery } from "../src/components/auth/Auth.types";
import { initialConsole } from "./api/initial-console"

export type AuthTypeOptionsType = typeof AUTH_TYPE_OPTIONS[RouterQuery.LOGIN]

export const AUTH_TYPE_OPTIONS = {
  [RouterQuery.REGISTRATION]: {
    id: RouterQuery.REGISTRATION,
    hasEmail: true,
    hasPassword: true,
    hasConfirmedPassword: false,
    hasPasswordValidation: true,
    title: 'Registration',
    toAuthLinks: [{
      href: '/auth',
      title: 'Have an account?'
    }]
  },
  [RouterQuery.FORGOT_PASSWORD]: {
    id: RouterQuery.FORGOT_PASSWORD,
    hasEmail: true,
    hasPassword: false,
    hasConfirmedPassword: false,
    hasPasswordValidation: false,
    title: 'Forgot Password',
    toAuthLinks: [{
      href: '/auth',
      title: 'Remember your password?'
    }]
  },
  [RouterQuery.LOGIN]: {
    id: RouterQuery.LOGIN,
    hasEmail: true,
    hasPassword: true,
    hasConfirmedPassword: false,
    hasPasswordValidation: false,
    title: 'Login',
    toAuthLinks: [{
      href: `/auth?type=${RouterQuery.REGISTRATION}`,
      title: 'Don\'t have an account?'
    },{
      href: `/auth?type=${RouterQuery.FORGOT_PASSWORD}`,
      title: 'Forgot your password?'
    }]
  }
}

export async function getServerSideProps(context: any) {
  let initialValues: AuthTypeOptionsType
  const newAuthTypeOptions: any = {...AUTH_TYPE_OPTIONS}

  if(context.query.type && newAuthTypeOptions[context.query.type]) {
    initialValues = newAuthTypeOptions[context.query.type]

  } else {
    initialValues = newAuthTypeOptions[RouterQuery.LOGIN]
  }

  return {
    props: {
      ...initialValues
    },
 };
}

function AuthPage(props: AuthTypeOptionsType) {
  return <AuthContainer {...props} />
}

export default AuthPage