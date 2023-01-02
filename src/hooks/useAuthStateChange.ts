// import { AuthChangeEvent, createClient, Session } from "@supabase/supabase-js"
// import { useEffect, useState } from "react"

// export enum AuthStateTypes {
//   SIGNED_IN,
//   SIGNED_OUT,
//   TOKEN_REFRESHED,
//   USER_UPDATED,
//   PASSWORD_RECOVERY
// }

// type StateType = {
//   event: AuthChangeEvent
//   session: Session | null
// }

// export const useAuthStateChange = () => {
//   const [state, setState] = useState<StateType>()
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
//   )

//   useEffect(() => {
//     supabase.auth.onAuthStateChange((event, session) => {
//       console.log(event, session)
//       setState({
//         event,
//         session
//       })
//     })
//   }, [])

//   return state || { event: null, session: null }
// }