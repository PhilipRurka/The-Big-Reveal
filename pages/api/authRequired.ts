import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export const authRequired = async (ctx: any) => {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log({
    supabase,
    session
  })
  
  if(session && supabase) {
    return {
      supabase,
      session
    }

  } else {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
}
