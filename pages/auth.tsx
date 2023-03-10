import AuthContainer from "../src/components/auth/Auth.container";
import { RouterQueryEnum } from "../src/components/auth/Auth.types";
import { isKeyOfObject } from "../src/types/global";
import { initialConsole } from "./api/initial-console"

export type AuthTypeOptionsType = typeof AUTH_TYPE_OPTIONS[RouterQueryEnum.LOGIN]

export const AUTH_TYPE_OPTIONS = {
  [RouterQueryEnum.REGISTRATION]: {
    id: RouterQueryEnum.REGISTRATION,
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
  [RouterQueryEnum.FORGOT_PASSWORD]: {
    id: RouterQueryEnum.FORGOT_PASSWORD,
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
  [RouterQueryEnum.LOGIN]: {
    id: RouterQueryEnum.LOGIN,
    hasEmail: true,
    hasPassword: true,
    hasConfirmedPassword: false,
    hasPasswordValidation: false,
    title: 'Login',
    toAuthLinks: [{
      href: `/auth?type=${RouterQueryEnum.REGISTRATION}`,
      title: 'Don\'t have an account?'
    },{
      href: `/auth?type=${RouterQueryEnum.FORGOT_PASSWORD}`,
      title: 'Forgot your password?'
    }]
  }
}

export async function getServerSideProps(context: any) {
  let initialValues: AuthTypeOptionsType
  const newAuthTypeOptions: typeof AUTH_TYPE_OPTIONS = {...AUTH_TYPE_OPTIONS}

  const type: string = context.query.type

  if(context.query.type && isKeyOfObject(type, newAuthTypeOptions)) {
    initialValues = newAuthTypeOptions[type]

  } else {
    initialValues = newAuthTypeOptions[RouterQueryEnum.LOGIN]
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