import { AuthChangeEvent } from '@supabase/supabase-js'
import Router from 'next/router'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../redux/redux_hooks'
import { update_userData } from '../../redux/slices/userSlice'
import { supabase } from '../../utils/supabase'
import ResetPassword from './ResetPassword'

const ResetPasswordContainer = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log({
          event,
          session
        })

        const newPassword = prompt("What would you like your new password to be?")

        const {
          data,
          error
        } = await supabase.auth.updateUser({ password: newPassword || undefined })

        console.log({
          data,
          error
        })

      } else {
        if(event === "SIGNED_IN") {
          console.log({
            event,
            session
          })
          if(session) {
            dispatch(update_userData(session))

            Router.push('dashboard')
          }
        }
      }
    })

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe()
      }
    };
  }, [supabase.auth])

  return <ResetPassword />
}

export default ResetPasswordContainer