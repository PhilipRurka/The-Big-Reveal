import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import Router, { useRouter } from "next/router"
import { AuthTypeOptionsType, AUTH_TYPE_OPTIONS } from "../../../pages/auth"
import usePasswordValidation from "../../hooks/usePasswordValidation"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { getRedirectURL } from "../../utils/redirect"
import { supabase } from "../../utils/supabase"
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
  StatusMessageTypesEnum,
  ExpandedResType
} from "./Auth.types"
import {
  hide_message,
  status_message,
  update_dynamic_message
} from "../../redux/slices/authMessageSlice"

export const AUTH_TRANSITION_TIME = 300
const REGISTRATION_ERROR_TIME = 60

const AuthContainer: FC<AuthTypeOptionsType> = ({
  id,
  hasEmail,
  hasPassword,
  hasConfirmedPassword,
  hasPasswordValidation,
  title,
  toAuthLinks
}) => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const registrationTimeLeftRef = useRef<ReturnType<typeof setInterval>>()

  const [password, setPassword] = useState('')
  // const [statusMessage, setStatusMessage] = useState<StatusMessageType>(null)
  const [resStatus, setResStatus] = useState<ResType['status']>()
  const [registrationTimeLeft, setRegistrationTimeLeft] = useState<number>(REGISTRATION_ERROR_TIME)
  const [typeProps, setTypeProps] = useState<TypePropsType>({
    id,
    hasEmail,
    hasPassword,
    hasConfirmedPassword,
    hasPasswordValidation,
    title,
    toAuthLinks
  })

  const router = useRouter()
  const dispatch = useAppDispatch()
  const validationStatuses = usePasswordValidation(password)

  /* #region LOGIN */
  const handleLogin: HandleNarrowAuthType = useCallback(async () => {
    if(!passwordRef?.current || !emailRef.current) return

    const {
      data,
      error: resError
    } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value ?? '',
      password: passwordRef.current.value,
    })

    const error = resError as ResType

    let errorStatus = error ? error.status : 200
    setResStatus(errorStatus)

    dispatch(status_message({
      source: RouterQueryEnum.LOGIN,
      type: StatusMessageTypesEnum.ERROR,
      status: errorStatus,
    }))

    if(data?.session) {
      dispatch(update_userData(data.session))
      Router.push('dashboard')
    }
  }, [dispatch])
  /* #endregion */

  /* #region REGISTRATION */

  const resetRegistrationTimeLeft = useCallback(() => {
    clearInterval(registrationTimeLeftRef?.current)
    registrationTimeLeftRef.current = undefined
    setRegistrationTimeLeft(REGISTRATION_ERROR_TIME)
  }, [])

  const updateRegistrationTimeLeft = useCallback(() =>  {
    setRegistrationTimeLeft((previous) => (previous - 1))
  }, [])

  const handleRegistration: HandleNarrowAuthType = useCallback(async () => {
    if(!passwordRef?.current || !emailRef.current) return

    const {
      data,
      error: resError
    } = await supabase.auth.signUp({
      email: emailRef.current.value ?? '',
      password: passwordRef.current.value,
    })

    const error = resError as ResType

    if(!registrationTimeLeftRef.current) {
      registrationTimeLeftRef.current = setInterval(updateRegistrationTimeLeft, 1000)
    }

    let errorStatus = error ? error.status : 200
    setResStatus(errorStatus)

    dispatch(status_message({
      source: RouterQueryEnum.REGISTRATION,
      type: data?.user ? StatusMessageTypesEnum.SUCCESS : StatusMessageTypesEnum.ERROR,
      status: errorStatus,
      dynamicValue: data?.user ? emailRef.current.value : undefined
    }))
  }, [updateRegistrationTimeLeft])

  /* #endregion */

  /* #region FORGOT PASSWORD */

  const handleForgotPassword: HandleNarrowAuthType = useCallback(async () => {
    if(!emailRef.current) return

    const {
      data,
      error: resError
    } = await supabase.auth.resetPasswordForEmail(emailRef.current.value ?? '', {
      redirectTo: getRedirectURL('reset-password'),
    })

    const error = resError as ExpandedResType

    let errorStatus = error ? error.status : 200
    setResStatus(errorStatus)

    dispatch(status_message({
      source: RouterQueryEnum.FORGOT_PASSWORD,
      type: data ? StatusMessageTypesEnum.SUCCESS : StatusMessageTypesEnum.ERROR,
      status: errorStatus,
      message: error?.message,
      dynamicValue: data ? emailRef.current.value : undefined
    }))
  }, [])

  /* #endregion */

  /* #region ANIMATION */

  const transitionObject = useMemo(() => ({
    title: AuthTransitionIdsEnum.TITLE,
    hasEmail: AuthTransitionIdsEnum.EMAIL,
    hasPassword: AuthTransitionIdsEnum.PASSWORD,
    toAuthLinks: AuthTransitionIdsEnum.TO_AUTH_LINKS
  }), [])

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
      resetRegistrationTimeLeft()
    }, AUTH_TRANSITION_TIME * 2)
  }, [resetRegistrationTimeLeft])

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
  let passwordCheck = false
  if(typeProps.hasPassword && typeProps.hasPasswordValidation) {
    if(!validationStatuses?.isSuccess) {
      passwordCheck = true
    }
  }

  const errorStatusCheck= registrationTimeLeft !== 60 && resStatus === 429
  const isDisabled = passwordCheck || errorStatusCheck
  return isDisabled
}, [validationStatuses, registrationTimeLeft, typeProps, resStatus])
  /* #endregion */

  /* #region USE_EFFECT */

  /** Update Dynamic Messages */
  useEffect(() => {
    if(resStatus === 429 && registrationTimeLeftRef?.current) {
      if(registrationTimeLeft === -1) {
        removeStatusMessage()
        return
      }

      dispatch(update_dynamic_message(registrationTimeLeft))
    }
  }, [registrationTimeLeft, removeStatusMessage, resStatus])

  useEffect(() => {
    if(resStatus !== 429) {
      if(registrationTimeLeft === -1) {
        resetRegistrationTimeLeft()
      }
    }
  }, [registrationTimeLeft, resetRegistrationTimeLeft, resStatus])

  useEffect(() => { /** Init */
    return () => {
      clearInterval(registrationTimeLeftRef.current)
    }
  }, [])

  useEffect(() => {
    removeStatusMessage()

    const authType = router.asPath.split('/auth?type=')[1]

    let newTypeProps: TypePropsType

    if(authType === RouterQueryEnum.REGISTRATION) {
      newTypeProps = AUTH_TYPE_OPTIONS[RouterQueryEnum.REGISTRATION]

    } else if(authType === RouterQueryEnum.FORGOT_PASSWORD) {
      newTypeProps = AUTH_TYPE_OPTIONS[RouterQueryEnum.FORGOT_PASSWORD]

    } else {
      newTypeProps = AUTH_TYPE_OPTIONS[RouterQueryEnum.LOGIN]
    }

    const timeoutTime = typeProps.title ? AUTH_TRANSITION_TIME : 0

    setTimeout(() => {
      setTypeProps(newTypeProps)
    }, timeoutTime)

    if(typeProps.title && newTypeProps) {
      for (let i = 0; i < Object.keys(transitionObject).length; i++) {
        const keys = Object.keys(transitionObject) as Array<keyof typeof transitionObject>;
        const key = keys[i];

        if(JSON.stringify(typeProps[key]) !== JSON.stringify(newTypeProps[key])) {
          let shrinkHeight: null | 'add' | 'remove' = null

          if(key === 'hasEmail' || key === 'hasPassword') {
            shrinkHeight = typeProps[key] ? 'remove' : 'add'
          }

          contentSwitchAnimation(`#${transitionObject[key]}`, shrinkHeight)
        }
      }
    }
  }, [router, removeStatusMessage, transitionObject, typeProps])

  /* #endregion */

  const refs = { emailRef, passwordRef }

  return (
    <Auth
      {...authProps}
      {...typeProps}
      ref={refs as any}
      handleSubmit={handleSubmit}
      disableSubmit={disableSubmit}
      // statusMessage={statusMessage}
      removeStatusMessage={removeStatusMessage} />
  )
}

export default AuthContainer