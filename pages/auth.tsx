import { GetServerSidePropsContext } from "next";
import AuthContainer from "../src/components/auth/Auth.container";
import { RouterQueryEnum } from "../src/components/auth/Auth.types";
import { isKeyOfObject } from "../src/types/global";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

type AuthTypeType = keyof typeof AUTH_TYPE_OPTIONS

type AuthTypeOptionsType = typeof AUTH_TYPE_OPTIONS[RouterQueryEnum.LOGIN]

export type AuthPageType = AuthTypeOptionsType & {
  initRouterAuthType: AuthTypeType
}

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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if(session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  let initialValues: AuthTypeOptionsType
  let initRouterAuthType: AuthTypeType
  const newAuthTypeOptions: typeof AUTH_TYPE_OPTIONS = {...AUTH_TYPE_OPTIONS}

  const type = ctx.query.type as string

  if(ctx.query.type && isKeyOfObject(type, newAuthTypeOptions)) {
    initialValues = newAuthTypeOptions[type]
    initRouterAuthType = type

  } else {
    initialValues = newAuthTypeOptions[RouterQueryEnum.LOGIN]
    initRouterAuthType = RouterQueryEnum.LOGIN
  }

  return {
    props: {
      ...initialValues,
      initRouterAuthType
    },
 };
}

function AuthPage(props: AuthPageType) {
  return <AuthContainer {...props} />
}

export default AuthPage