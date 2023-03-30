import Router from "next/router"
import React, { useEffect } from "react"
import { supabase } from "../utils/supabase"

function withAuthRequired(Component: any) {
  return class extends React.Component {

    async componentDidMount(): Promise<void> {
      const { data, error } = await supabase.auth.getSession()

      if(error) {
        console.error(error)
      }

      if(!data.session) {
        Router.push('auth')
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }
}




// const withAuthRequired = (Component: any) => (props: any) => {
//   useEffect(() => {
//     (async () => {
//       const { data, error } = await supabase.auth.getSession()

//       if(error) {
//         console.error(error)
//       }

//       if(!data.session) {
//         Router.push('auth')
//       }
//     })()
//   }, [])

//   return <Component {...props}/>
// }

export default withAuthRequired