import Router from "next/router"
import React, { Component, ComponentType } from "react"
import { getDisplayName } from "../utils/hoc"
import { supabase } from "../utils/supabase"

const withAuthRequired = <T extends object>(WrappedComponent: ComponentType<T>) => {
  class WithAuthRequired extends Component<T> {
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
      return <WrappedComponent {...this.props} />
    }
  }

  /** @ts-ignore */
  WithAuthRequired.displayName = `withAuthRequired-${getDisplayName(WrappedComponent)}`
  
  return WithAuthRequired
}

export default withAuthRequired