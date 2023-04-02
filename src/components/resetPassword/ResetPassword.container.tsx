import Router from 'next/router'
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import usePasswordValidation from '../../hooks/usePasswordValidation'
import { useAppDispatch } from '../../redux/redux_hooks'
import { hide_message, status_message } from '../../redux/slices/authMessageSlice'
import { update_userData } from '../../redux/slices/userSlice'
import Auth from '../auth/Auth'
import { AUTH_TRANSITION_TIME } from '../auth/Auth.container'
import { ResType, RouterQueryEnum, StatusMessageTypesEnum } from '../auth/Auth.types'
import { InputOnChangeType } from '../input/Input'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const ResetPasswordContainer = () => {
  const passwordRef = useRef<HTMLInputElement>(null)

  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  const dispatch = useAppDispatch()
  const validationStatuses = usePasswordValidation(password)
  const supabaseClient = useSupabaseClient()

  // useEffect(() => {
  //   const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
  //     if(event === "SIGNED_IN") {
  //       console.log({
  //         event,
  //         session
  //       })
  //       if(session) {
  //         dispatch(update_userData(session))
  //       }
  //     }
  //   })

  //   return () => {
  //     if (authListener?.subscription) {
  //       authListener.subscription.unsubscribe()
  //     }
  //   };
  // }, [dispatch, supabaseClient.auth])

  const handleSubmit = useCallback( async(event: FormEvent): Promise<void> => {
    event.preventDefault()
    if(!passwordRef?.current?.value) return
    const {
      data,
      error: resError
    } = await supabaseClient.auth.updateUser({ password: passwordRef.current.value })

    const error = resError as ResType

    let errorStatus = error ? error.status : 200

    dispatch(status_message({
      source: RouterQueryEnum.RESET_PASSWORD,
      type: StatusMessageTypesEnum.ERROR,
      status: errorStatus
    }))

    if(data?.user) {
      Router.push('dashboard')
    }
  }, [dispatch, supabaseClient.auth])

  const removeStatusMessage = useCallback(() => {
    dispatch(hide_message())

    setTimeout(() => {
      dispatch(status_message(null))
    }, AUTH_TRANSITION_TIME * 2)
  }, [dispatch])

  const handlePasswordUpdate = useCallback((event: InputOnChangeType): void => {
    removeStatusMessage()
    setPassword(event.currentTarget.value)
  }, [removeStatusMessage])

  const handleConfirmedPasswordUpdate = useCallback((event: InputOnChangeType): void => {
    removeStatusMessage()
    setConfirmedPassword(event.currentTarget.value)
  }, [removeStatusMessage])

  const disableSubmit = useMemo(() => {
    return !validationStatuses?.isSuccess || password !== confirmedPassword
  }, [validationStatuses, password, confirmedPassword])

  const typeProps = {
    id: RouterQueryEnum.REGISTRATION,
    hasEmail: false,
    hasPassword: true,
    hasConfirmedPassword: true,
    hasPasswordValidation: true,
    title: 'Reset Password',
    toAuthLinks: []
  }

  return (
    <Auth
      {...typeProps}
      ref={{ passwordRef } as any}
      password={password}
      confirmedPassword={confirmedPassword}
      validationStatuses={validationStatuses}
      handlePasswordUpdate={handlePasswordUpdate}
      handleConfirmedPasswordUpdate={handleConfirmedPasswordUpdate}
      handleSubmit={handleSubmit}
      disableSubmit={disableSubmit}
      removeStatusMessage={removeStatusMessage} />
  )
}

export default ResetPasswordContainer