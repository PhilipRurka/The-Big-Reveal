import Router from "next/router"
import { useEffect } from "react"
import { supabase } from "../utils/supabase"

// eslint-disable-next-line react/display-name
const withAuthRequired = (Component: any) => (props: any) => {
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession()

      if(error) {
        console.error(error)
      }

      if(!data.session) {
        Router.push('auth')
      }
    })()
  }, [])

  return <Component {...props}/>
}

export default withAuthRequired