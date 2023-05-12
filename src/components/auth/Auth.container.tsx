import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import Router, { useRouter } from "next/router"
import usePasswordValidation from "../../hooks/usePasswordValidation"
import { useAppDispatch, useAppSelector } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import Auth from "./Auth"
import {
  hide_message,
  selectAuthMessage,
  status_message,
  update_dynamic_message
} from "../../redux/slices/authMessageSlice"
import useRigidCountdown from "../../hooks/useRigidCountdown"
import { StatusMessageTypesEnum } from '../formMessage/FormMessage.container'
import {
  AuthTransitionIdsEnum,
  RouterQueryEnum
} from './Auth.enum'
import {
  AUTH_TRANSITION_TIME,
  AUTH_TYPE_OPTIONS
} from './Auth.constant'

import type { FC } from 'react'
import type {
  AuthAddedProps,
  ContentSwitchAnimation,
  Res,
  HandleNarrowAuthFunction,
  HandleAuthSubmit,
  CurrentOption,
  AuthContainerProps,
} from "./Auth.type"
import type { DefinedStatusMessageState } from "../../redux/types/authMessageRedux.type"
import type { InputOnChange } from '../input/Input.type'

const AuthContainer: FC<AuthContainerProps> = ({
  id,
  hasEmail,
  hasPassword,
  hasConfirmedPassword,
  hasUsername,
  hasPasswordValidation,
  title,
  toAuthLinks,
  initRouterAuthType
}) => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)

  const [password, setPassword] = useState('')
  const [resStatus, setResStatus] = useState<number | undefined>()
  const [routerAuthType, setRouterAuthType] = useState(initRouterAuthType)
  const [currentOption, setCurrentOption] = useState<CurrentOption>({
    id,
    hasEmail,
    hasPassword,
    hasConfirmedPassword,
    hasUsername,
    hasPasswordValidation,
    title,
    toAuthLinks
  })

  const supabaseClient = useSupabaseClient()
  const authMessage = useAppSelector(selectAuthMessage) as DefinedStatusMessageState
  const router = useRouter()
  const dispatch = useAppDispatch()
  const validationStatuses = usePasswordValidation(password)
  const {
    initCountdown,
    countdownTimeLeft,
    resetCooldownTimeLeft
  } = useRigidCountdown()

  /* #region LOGIN */
  const handleLogin: HandleNarrowAuthFunction = useCallback(async () => {
    if(!passwordRef?.current || !emailRef.current) return

    const {
      data,
      error: resError
    } = await supabaseClient.auth.signInWithPassword({
      email: emailRef.current.value ?? '',
      password: passwordRef.current.value,
    })

    const error = resError as Res

    let errorStatus = error ? error.status : 200
    setResStatus(errorStatus)

    if(data) {
      if(data?.session) {
        dispatch(update_userData(data.session))
        Router.push('your-space')
  
      } else {
        dispatch(status_message({
          source: RouterQueryEnum.LOGIN,
          type: StatusMessageTypesEnum.ERROR,
          status: errorStatus,
        })) 
      }

    } else {
      dispatch(status_message({
        source: RouterQueryEnum.LOGIN,
        type: StatusMessageTypesEnum.ERROR,
        status: errorStatus,
      }))
    }
  }, [dispatch, supabaseClient.auth])
  /* #endregion */

  /* #region REGISTRATION */
  const handleRegistration: HandleNarrowAuthFunction = useCallback(async () => {
    if(!passwordRef?.current || !emailRef.current || !usernameRef.current) return

    let path = usernameRef.current.value.toLowerCase()
    path = path.replaceAll(/ /g, '-')

    const {
      data,
      error: resError
    } = await supabaseClient.auth.signUp({
      email: emailRef.current.value ?? '',
      password: passwordRef.current.value,
      options: {
        data: { 
          username: usernameRef.current.value,
          path
        }
      }
    })

    const error = resError as Res

    if(error?.status === 429) {
      const bufferFormat = [
        'For security purposes, you can only request this after ',
        ' seconds.'
      ]

      if(error.message.includes(bufferFormat[0])) {
        let timeLeft: string | number = error.message.replace(bufferFormat[0], '')
        timeLeft = timeLeft.replace(bufferFormat[1], '')
        timeLeft = Number(timeLeft)
        initCountdown(timeLeft)
      }
    }

    let errorStatus = error ? error.status : 200
    setResStatus(errorStatus)

    dispatch(status_message({
      source: RouterQueryEnum.REGISTRATION,
      type: data?.user ? StatusMessageTypesEnum.SUCCESS : StatusMessageTypesEnum.ERROR,
      status: errorStatus,
      message: error?.message,
      dynamicValue: data?.user ? emailRef.current.value : undefined
    }))
  }, [initCountdown, dispatch, supabaseClient.auth])

  /* #endregion */

  /* #region FORGOT PASSWORD */

  const handleForgotPassword: HandleNarrowAuthFunction = useCallback(async () => {
    if(!emailRef.current) return

    const {
      data,
      error: resError
    } = await supabaseClient.auth.resetPasswordForEmail(emailRef.current.value ?? '', {
      redirectTo: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/${RouterQueryEnum.RESET_PASSWORD}/`
    })

    const error = resError as Res

    let errorStatus = error ? error.status : 200
    setResStatus(errorStatus)

    dispatch(status_message({
      source: RouterQueryEnum.FORGOT_PASSWORD,
      type: data ? StatusMessageTypesEnum.SUCCESS : StatusMessageTypesEnum.ERROR,
      status: errorStatus,
      message: error?.message,
      dynamicValue: data ? emailRef.current.value : undefined
    }))
  }, [dispatch, supabaseClient.auth])

  /* #endregion */

  /* #region ANIMATION */
  const contentSwitchAnimation: ContentSwitchAnimation = (id, shrinkHeight) => {
    const shrinkHeightProperties = shrinkHeight ? {
      remove: {
        height: shrinkHeight === 'remove' ? '0' : '43',
        margin: shrinkHeight === 'remove' ? '0' : '20 0 0 0',
        alpha:  shrinkHeight === 'remove' ? '0' : '1'
      },
      add: {
        height: shrinkHeight === 'add' ? '43' : '0',
        margin: shrinkHeight === 'add' ? '20 0 0 0' : '0',
        alpha:  shrinkHeight === 'add' ? '1' : '0'
      }
    } : {}

    const contentSwitch = gsap.timeline().to(id, {
      alpha: 0,
      duration: AUTH_TRANSITION_TIME / 1000,
      ease: 'none',
      ...shrinkHeightProperties.remove
    })
    .to(id, {
      alpha: 1,
      duration: AUTH_TRANSITION_TIME / 1000,
      ease: 'none',
      ...shrinkHeightProperties.add
    })
    
    contentSwitch.play()
    setTimeout(() => {
      contentSwitch.kill()
    }, AUTH_TRANSITION_TIME * 2)
  }
  /* #endregion */

  /* #region UTILITIES */
  const handleSubmit: HandleAuthSubmit = useCallback((event) => {
    event.preventDefault()
    if(currentOption.id === RouterQueryEnum.LOGIN) {
      handleLogin()

    } else if(currentOption.id === RouterQueryEnum.REGISTRATION) {
      handleRegistration()

    } else if(currentOption.id === RouterQueryEnum.FORGOT_PASSWORD) {
      handleForgotPassword()
    }
  }, [currentOption, handleLogin, handleRegistration, handleForgotPassword])

  const removeStatusMessage = useCallback(() => {
    dispatch(hide_message())

    setTimeout(() => {
      dispatch(status_message(null))
      resetCooldownTimeLeft()
    }, AUTH_TRANSITION_TIME * 2)
  }, [dispatch, resetCooldownTimeLeft])

  const handlePasswordUpdate = useCallback((event: InputOnChange): void => {
    removeStatusMessage()
    setPassword(event.currentTarget.value)
  }, [removeStatusMessage])

  const authAddedProps: AuthAddedProps = useMemo(() => {
    let finalObject: AuthAddedProps = {}
    if(currentOption.hasPassword) {
      finalObject = {
        password,
        validationStatuses,
        handlePasswordUpdate
      }
    }

    return finalObject
  }, [currentOption, password, validationStatuses, handlePasswordUpdate])

  const disableSubmit = useMemo(() => {
    if(routerAuthType === RouterQueryEnum.FORGOT_PASSWORD) return false

    if(currentOption.hasPassword && currentOption.hasPasswordValidation) {
      if(!validationStatuses?.isSuccess) {
        return true
      }
    }

    if(authMessage.type === StatusMessageTypesEnum.ERROR) {
      return true
    }

    return false
  }, [validationStatuses, currentOption, routerAuthType, authMessage])

  /* #endregion */

  /* #region USE_EFFECT */

  useEffect(() => {
    let timeout: NodeJS.Timer
    
    if(resStatus === 429) {
      if(countdownTimeLeft === 0) {
        removeStatusMessage()
      }

      dispatch(update_dynamic_message(countdownTimeLeft))
    }

    return () => {
      clearInterval(timeout)
    }
  }, [countdownTimeLeft, resStatus, dispatch, removeStatusMessage])

  useEffect(() => {
    const authType = router.asPath.split('/auth?type=')[1]

    if(authType === RouterQueryEnum.REGISTRATION || authType === RouterQueryEnum.FORGOT_PASSWORD) {
      setRouterAuthType(authType)

    } else {
      setRouterAuthType(RouterQueryEnum.LOGIN)
    }
  }, [router])

  useEffect(() => {
    removeStatusMessage()

    let authTypeOption: CurrentOption

    if(routerAuthType === RouterQueryEnum.REGISTRATION || routerAuthType === RouterQueryEnum.FORGOT_PASSWORD) {
      authTypeOption = AUTH_TYPE_OPTIONS[routerAuthType]

    } else {
      authTypeOption = AUTH_TYPE_OPTIONS[RouterQueryEnum.LOGIN]
    }

    const timeoutTime = currentOption.title ? AUTH_TRANSITION_TIME : 0

    setTimeout(() => {
      setCurrentOption(authTypeOption)
    }, timeoutTime)

    const transitionObject = {
      title: AuthTransitionIdsEnum.TITLE,
      hasEmail: AuthTransitionIdsEnum.EMAIL,
      hasPassword: AuthTransitionIdsEnum.PASSWORD,
      hasUsername: AuthTransitionIdsEnum.USERNAME,
      toAuthLinks: AuthTransitionIdsEnum.TO_AUTH_LINKS
    }

    if(currentOption.title && authTypeOption) {
      for (let i = 0; i < Object.keys(transitionObject).length; i++) {
        const keys = Object.keys(transitionObject) as Array<keyof typeof transitionObject>;
        const key = keys[i];

        if(JSON.stringify(currentOption[key]) !== JSON.stringify(authTypeOption[key])) {
          let shrinkHeight: null | 'add' | 'remove' = null

          if(key === 'hasEmail' || key === 'hasPassword' || key === 'hasUsername') {
            shrinkHeight = currentOption[key] ? 'remove' : 'add'
          }

          contentSwitchAnimation(`#${transitionObject[key]}`, shrinkHeight)
        }
      }
    }
  }, [router, currentOption, removeStatusMessage, routerAuthType])

  /* #endregion */

  const refs = { emailRef, passwordRef, usernameRef }

  return (
    <Auth
      {...authAddedProps}
      {...currentOption}
      ref={refs as any}
      handleSubmit={handleSubmit}
      disableSubmit={disableSubmit}
      removeStatusMessage={() => removeStatusMessage()}
      formMessageProps={{
        type: authMessage.type,
        message: authMessage.formattedMessage,
        showMessage: authMessage.showMessage
      }} />
  )
}

export default AuthContainer