import React, { useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { ResetPasswordWrapper } from './ResetPassword.styled'

const ResetPassword = () => {
  /**
 * Step 2: Once the user is redirected back to your application,
 * ask the user to reset their password.
 */
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log({
        event,
        session
      })

      if (event === "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");

        const {
          data,
          error
        } = await supabase.auth.updateUser({ password: newPassword || undefined })

        console.log({
          data,
          error
        })
      }
    })
  }, [])

  return (
    <ResetPasswordWrapper>
    
    </ResetPasswordWrapper>
  )
}

export default ResetPassword