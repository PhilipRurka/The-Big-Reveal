import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import Router, { useRouter } from "next/router"
import { AuthPageType, AUTH_TYPE_OPTIONS } from "../../../pages/auth"
import usePasswordValidation from "../../hooks/usePasswordValidation"
import { useAppDispatch, useAppSelector } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { InputOnChangeType } from "../input/Input"
import Auth from "./Auth"
import {
  AuthPropsType,
  AuthTransitionIdsEnum,
  ContentSwitchAnimationType,
  ResType,
  HandleNarrowAuthType,
  HandleWrapperAuthType,
  RouterQueryEnum,
  TypePropsType,
} from "./Auth.types"
import {
  hide_message,
  selectAuthMessage,
  status_message,
  update_dynamic_message
} from "../../redux/slices/authMessageSlice"
import useRigidCountdown from "../../hooks/useRigidCountdown"
import { DefinedStatusMessageStateType } from "../../redux/types/authMessageRedux.type"
import { StatusMessageTypesEnum } from '../FormMessage/FormMessage.container'

export const AUTH_TRANSITION_TIME = 300

const AuthContainer: FC<AuthPageType> = ({
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
  const [typeProps, setTypeProps] = useState<TypePropsType>({
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
  const authMessage = useAppSelector(selectAuthMessage) as DefinedStatusMessageStateType
  const router = useRouter()
  const dispatch = useAppDispatch()
  const validationStatuses = usePasswordValidation(password)
  const {
    initCountdown,
    countdownTimeLeft,
    resetCooldownTimeLeft
  } = useRigidCountdown()

  /* #region LOGIN */
  const handleLogin: HandleNarrowAuthType = useCallback(async () => {
    if(!passwordRef?.current || !emailRef.current) return

    const {
      data,
      error: resError
    } = await supabaseClient.auth.signInWithPassword({
      email: emailRef.current.value ?? '',
      password: passwordRef.current.value,
    })

    const error = resError as ResType

    let errorStatus = error ? error.status : 200
    setResStatus(errorStatus)

    if(data) {
      if(data?.session) {
        dispatch(update_userData(data.session))
        Router.push('dashboard')
  
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
  const handleRegistration: HandleNarrowAuthType = useCallback(async () => {
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

    const error = resError as ResType

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

  const handleForgotPassword: HandleNarrowAuthType = useCallback(async () => {
    if(!emailRef.current) return

    const url = process.env.NEXT_PUBLIC_VERCEL_URL

    const {
      data,
      error: resError
    } = await supabaseClient.auth.resetPasswordForEmail(emailRef.current.value ?? '', {
      redirectTo: `https://${url}/${RouterQueryEnum.RESET_PASSWORD}/`
    })

    const error = resError as ResType

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
  const contentSwitchAnimation: ContentSwitchAnimationType = (id, shrinkHeight) => {
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
  const handleSubmit: HandleWrapperAuthType = useCallback((event) => {
    event.preventDefault()
    if(typeProps.id === RouterQueryEnum.LOGIN) {
      handleLogin()

    } else if(typeProps.id === RouterQueryEnum.REGISTRATION) {
      handleRegistration()

    } else if(typeProps.id === RouterQueryEnum.FORGOT_PASSWORD) {
      handleForgotPassword()
    }
  }, [typeProps, handleLogin, handleRegistration, handleForgotPassword])

  const removeStatusMessage = useCallback(() => {
    dispatch(hide_message())

    setTimeout(() => {
      dispatch(status_message(null))
      resetCooldownTimeLeft()
    }, AUTH_TRANSITION_TIME * 2)
  }, [dispatch, resetCooldownTimeLeft])

  const handlePasswordUpdate = useCallback((event: InputOnChangeType): void => {
    removeStatusMessage()
    setPassword(event.currentTarget.value)
  }, [removeStatusMessage])

  const authProps: AuthPropsType = useMemo(() => {
    let finalObject: AuthPropsType = {}
    if(typeProps.hasPassword) {
      finalObject = {
        password,
        validationStatuses,
        handlePasswordUpdate
      }
    }

    return finalObject
  }, [typeProps, password, validationStatuses, handlePasswordUpdate])

  const disableSubmit = useMemo(() => {
    if(routerAuthType === RouterQueryEnum.FORGOT_PASSWORD) return false

    if(typeProps.hasPassword && typeProps.hasPasswordValidation) {
      if(!validationStatuses?.isSuccess) {
        return true
      }
    }

    if(authMessage.type === StatusMessageTypesEnum.ERROR) {
      return true
    }

    return false
  }, [validationStatuses, typeProps, routerAuthType, authMessage])

  /* #endregion */

  /* #region USE_EFFECT */

  useEffect(() => {
    let timeout: ReturnType<typeof setInterval>
    
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

    let newTypeProps: TypePropsType

    if(routerAuthType === RouterQueryEnum.REGISTRATION || routerAuthType === RouterQueryEnum.FORGOT_PASSWORD) {
      newTypeProps = AUTH_TYPE_OPTIONS[routerAuthType]

    } else {
      newTypeProps = AUTH_TYPE_OPTIONS[RouterQueryEnum.LOGIN]
    }

    const timeoutTime = typeProps.title ? AUTH_TRANSITION_TIME : 0

    setTimeout(() => {
      setTypeProps(newTypeProps)
    }, timeoutTime)

    const transitionObject = {
      title: AuthTransitionIdsEnum.TITLE,
      hasEmail: AuthTransitionIdsEnum.EMAIL,
      hasPassword: AuthTransitionIdsEnum.PASSWORD,
      hasUsername: AuthTransitionIdsEnum.USERNAME,
      toAuthLinks: AuthTransitionIdsEnum.TO_AUTH_LINKS
    }

    if(typeProps.title && newTypeProps) {
      for (let i = 0; i < Object.keys(transitionObject).length; i++) {
        const keys = Object.keys(transitionObject) as Array<keyof typeof transitionObject>;
        const key = keys[i];

        if(JSON.stringify(typeProps[key]) !== JSON.stringify(newTypeProps[key])) {
          let shrinkHeight: null | 'add' | 'remove' = null

          if(key === 'hasEmail' || key === 'hasPassword' || key === 'hasUsername') {
            shrinkHeight = typeProps[key] ? 'remove' : 'add'
          }

          contentSwitchAnimation(`#${transitionObject[key]}`, shrinkHeight)
        }
      }
    }
  }, [router, typeProps, removeStatusMessage, routerAuthType])

  /* #endregion */

  const refs = { emailRef, passwordRef, usernameRef }

  return (
    <Auth
      {...authProps}
      {...typeProps}
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