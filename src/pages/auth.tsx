import AuthContainer from "../components/auth/Auth.container";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { RouterQueryEnum } from "../components/auth/Auth.enum";
import { isKeyOfObject } from "../types/global.type";
import { AUTH_TYPE_OPTIONS } from "../components/auth/Auth.constant";

import type { GetServerSidePropsContext } from "next";
import type {
  AuthPageData,
  AuthTypeOptionsType,
  RouterAuthOptions
} from "../components/auth/Auth.type";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  let initialValues: AuthTypeOptionsType
  let initRouterAuthType: RouterAuthOptions
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

function AuthPage(props: AuthPageData) {
  return <AuthContainer {...props} />
}

export default AuthPage