import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import type { Database } from "../src/types/supabase.type"

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

type Supabase = SupabaseClient<Database>

type GetSessionFromSupabase = (supabase: Supabase) => Promise<Session | null>

type GetRefreshToken = (ctx: GetServerSidePropsContext) => null | string

type GetNewSession = (supabase: Supabase, refreshToken: string) => Promise<Session | null>

const getRefreshToken: GetRefreshToken = (ctx) => {  
  let supabaseAuthToken = ctx.req.cookies['supabase-auth-token']

  if(!supabaseAuthToken) return null

  supabaseAuthToken = supabaseAuthToken.replaceAll(/"/g, '')
  const tokens = supabaseAuthToken.split(',')
  const refreshToken = tokens[1]
  return refreshToken
}

const getNewSession: GetNewSession = async (supabase, refreshToken) => {
  const { data } = await supabase.auth.refreshSession({ refresh_token: refreshToken })

  return data.session
}

const getSessionFromSupabase: GetSessionFromSupabase = async (supabase) => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if(error) {
    console.log(error)
  }
    
  return session
}

export const authRequired = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx)
  let session = await getSessionFromSupabase(supabase)

  if(!session) {
    const refreshToken = getRefreshToken(ctx)

    if(refreshToken) {
      session = await getNewSession(supabase, refreshToken)
    }
  }
  
  if(!supabase || !session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }

  } else {
    return {
      supabase,
      session
    }
  }
}