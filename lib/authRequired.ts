import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../src/types/supabase-types"

export const authRequired = async (ctx: any) => {
  const supabase = createServerSupabaseClient<Database>(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
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
      }
    }
  }
}
