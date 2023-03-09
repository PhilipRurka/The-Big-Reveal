import Router from 'next/router'
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import usePasswordValidation from '../../hooks/usePasswordValidation'
import { useAppDispatch } from '../../redux/redux_hooks'
import { update_userData } from '../../redux/slices/userSlice'
import { supabase } from '../../utils/supabase'
import Auth from '../auth/Auth'
import { AUTH_TRANSITION_TIME } from '../auth/Auth.container'
import { ResType, RouterQuery, StatusMessageType, StatusMessageTypesEnum } from '../auth/Auth.types'
import { InputOnChangeType } from '../input/Input'

const ResetPasswordContainer = () => {
  const passwordRef = useRef<HTMLInputElement>(null)

  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [statusMessage, setStatusMessage] = useState<StatusMessageType>(null)
  const [resStatus, setResStatus] = useState<ResType['status']>()

  const dispatch = useAppDispatch()
  const validationStatuses = usePasswordValidation(password)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if(event === "SIGNED_IN") {
        console.log({
          event,
          session
        })
        if(session) {
          dispatch(update_userData(session))
        }
      }
    })

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe()
      }
    };
  }, [dispatch])

  const handleSubmit = useCallback( async(event: FormEvent): Promise<void> => {
    event.preventDefault()
    if(!passwordRef?.current?.value) return
    const {
      data,
      error: resError
    } = await supabase.auth.updateUser({ password: passwordRef.current.value })

    const error = resError as ResType

    if(error) {
      setResStatus(error.status)
      setStatusMessage({
        type: StatusMessageTypesEnum.ERROR,
        showMessage: true,
        message: `Invalid Email Format`
      })
      
    } else {
      if(data?.user) {
        Router.push('dashboard')
      }

      console.log({
        data,
        error
      })
    }
  }, [])

  const removeStatusMessage = useCallback(() => {
    setStatusMessage((previous: any) => ({
      ...previous,
      showMessage: false
    }))

    setTimeout(() => {
      setStatusMessage(null)
    }, AUTH_TRANSITION_TIME * 2)
  }, [])

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
    id: RouterQuery.REGISTRATION,
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
      statusMessage={statusMessage}
      removeStatusMessage={removeStatusMessage} />
  )
}

export default ResetPasswordContainer