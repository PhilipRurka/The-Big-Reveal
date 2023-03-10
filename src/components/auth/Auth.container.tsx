import gsap from "gsap"
import Router, { useRouter } from "next/router"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  AuthTransitionIds,
  ContentSwitchAnimationType,
  ResType,
  HandleNarrowAuthType,
  HandleWrapperAuthType,
  RouterQuery,
  TypePropsType,
  StatusMessageTypesEnum,
  ExpandedResType,
  StatusMessageType
} from "./Auth.types"

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
  const registrationTimeLeftRef = useRef<any>()

  const [password, setPassword] = useState('')
  const [statusMessage, setStatusMessage] = useState<StatusMessageType>(null)
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

    if(error) {
      console.error({
        Location: 'auth.container.tsx',
        error
      })

      setResStatus(error.status)

      if(error.status === 400) {
        setStatusMessage({
          type: StatusMessageTypesEnum.ERROR,
          showMessage: true,
          message: 'Invalid Cradential'
        })

      } else if(error.status) {
        setStatusMessage({
          type: StatusMessageTypesEnum.ERROR,
          showMessage: true,
          message: 'Something went wrong on our end (server issue). Refresh the page and try again'
        })
      }
      
      return
    }

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

    if(error) {
      console.error({
        Location: 'auth.container.tsx',
        error
      })

      if(error.status === 422) {
        setResStatus(error.status)
        setStatusMessage({
          type: StatusMessageTypesEnum.ERROR,
          showMessage: true,
          message: `Invalid Email Format`
        })

      } else if(error.status === 429) {
        setResStatus(error.status)
        setStatusMessage({
          type: StatusMessageTypesEnum.ERROR,
          showMessage: true,
          message: ``
        })

      } else if(error.status) {
        setResStatus(error.status)
        setStatusMessage({
          type: StatusMessageTypesEnum.ERROR,
          showMessage: true,
          message: `An error has occured, refresh and try again!`
        })
      }

      return
    }

    if(data?.user) {
      setResStatus(200)
      setStatusMessage({
        type: StatusMessageTypesEnum.SUCCESS,
        showMessage: true,
        message: `A registration has been sent to ${emailRef.current.value}`
      })
    }
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

    if(error) {
      if(error.status === 422) {
        if(error.message === 'Password recovery requires an email') {
          setStatusMessage({
            type: StatusMessageTypesEnum.ERROR,
            showMessage: true,
            message: 'An email is required!'
          })

        } else if(error.message === 'Unable to validate email address: invalid format') {
          setStatusMessage({
            type: StatusMessageTypesEnum.ERROR,
            showMessage: true,
            message: 'Invalid Email'
          })
        }

      } else {
        setStatusMessage({
          type: StatusMessageTypesEnum.ERROR,
          showMessage: true,
          message: 'Something went wrong! Oh no!'
        })
      }
    }

    if(data) {
      setStatusMessage({
        type: StatusMessageTypesEnum.SUCCESS,
        showMessage: true,
        message: `A registration has been sent to ${emailRef.current.value}`
      })
    }
  }, [])

  /* #endregion */

  /* #region ANIMATION */

  const transitionObject = useMemo(() => ({
    title: AuthTransitionIds.TITLE,
    hasEmail: AuthTransitionIds.EMAIL,
    hasPassword: AuthTransitionIds.PASSWORD,
    toAuthLinks: AuthTransitionIds.TO_AUTH_LINKS
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
    if(typeProps.id === RouterQuery.LOGIN) {
      handleLogin()

    } else if(typeProps.id === RouterQuery.REGISTRATION) {
      handleRegistration()

    } else if(typeProps.id === RouterQuery.FORGOT_PASSWORD) {
      handleForgotPassword()
    }
  }, [typeProps, handleLogin, handleRegistration, handleForgotPassword])

  const removeStatusMessage = useCallback(() => {
    setStatusMessage((previous: any) => ({
      ...previous,
      showMessage: false
    }))

    setTimeout(() => {
      setStatusMessage(null)
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

      setStatusMessage((previous: any) => {
        return {
          ...previous,
          message: `You must wait ${registrationTimeLeft} seconds before you can submit another registration request`
        }
      })

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

    if(authType === RouterQuery.REGISTRATION) {
      newTypeProps = AUTH_TYPE_OPTIONS[RouterQuery.REGISTRATION]

    } else if(authType === RouterQuery.FORGOT_PASSWORD) {
      newTypeProps = AUTH_TYPE_OPTIONS[RouterQuery.FORGOT_PASSWORD]

    } else {
      newTypeProps = AUTH_TYPE_OPTIONS[RouterQuery.LOGIN]
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
      statusMessage={statusMessage}
      removeStatusMessage={removeStatusMessage} />
  )
}

export default AuthContainer