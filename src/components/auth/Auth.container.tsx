import gsap from "gsap"
import Router, { useRouter } from "next/router"
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import usePasswordValidation from "../../hooks/usePasswordValidation"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { supabase } from "../../utils/supabase"
import { InputOnChangeType } from "../input/Input"
import Auth from "./Auth"
import {
  AuthPropsType,
  AuthTransitionIds,
  ContentSwitchAnimationType,
  ErrorMessageType,
  ErrorType,
  HandleAuthType,
  RouterQuery,
  TypePropsType
} from "./Auth.types"

const TRANSITION_TIME = 300

const AuthContainer = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const tlRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>(null)
  const [typeProps, setTypeProps] = useState<TypePropsType>({
    hasEmail: undefined,
    hasPassword: undefined,
    title: undefined,
    submitFunction: undefined,
    toAuthLinks: undefined
  })
  const dispatch = useAppDispatch()
  const validationStatuses = usePasswordValidation(password)

  const handleLogin: HandleAuthType = async (event) => {
    event.preventDefault()
    if(!passwordRef?.current || !emailRef.current) return

    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value ?? '',
      password: passwordRef.current.value,
    })

    if(error) {
      console.error({
        Location: 'auth.container.tsx',
        error
      })

      if((error as ErrorType).status === 400) {
        setErrorMessage('Invalid Cradential')

      } else {
        setErrorMessage('Something went wrong on our end (server issue). Refresh the page and try again')
      }
      
      return
    }

    if(data?.session) {
      dispatch(update_userData(data.session))
      Router.push('dashboard')
    }
  }

  const handleRegistration = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    if(
      !passwordRef?.current ||
      !emailRef.current ||
      !validationStatuses.isSuccess
    ) return

    const {
      data,
      error
    } = await supabase.auth.signUp({
      email: emailRef.current.value ?? '',
      password: passwordRef.current.value,
    })

    if(error) {
      // console.error({
      //   Location: 'auth.container.tsx',
      //   error
      // })

      return
    }

    if(data?.session) {
      dispatch(update_userData(data.session))
    }
  }, [validationStatuses])

  const initGsap = useCallback(() => {
    tlRef.current.fromTo('#error-message-wrapper', {
      height: 0
    }, {
      height: 54,
      duration: TRANSITION_TIME / 1000,
      ease: 'power1.out'
    }, 0)
    .fromTo('#error-message', {
      alpha: 0
    }, {
      alpha: 1,
      duration: TRANSITION_TIME / 1000,
      ease: 'power1.out'
    }, '>')
  }, [])

  const handleReset = async () => {

  }

  const handlePasswordUpdate = (event: InputOnChangeType): void => {
    handleAnyInputChange()
    setPassword(event.currentTarget.value)
  }

  // const temporaryFunction = () => {
  //   setErrorMessage('Something went wrong on our end (server issue). Refresh the page and try again')
  // }

  const handleAnyInputChange = () => {
    tlRef.current.reverse()
    setTimeout(() => setErrorMessage(null), TRANSITION_TIME * 2)
  }

  const transitionObject = useMemo(() => ({
    title: AuthTransitionIds.TITLE,
    hasEmail: AuthTransitionIds.EMAIL,
    hasPassword: AuthTransitionIds.PASSWORD,
    toAuthLinks: AuthTransitionIds.TO_AUTH_LINKS
  }), [])

  const typesPropsOptions = useMemo(() => ({
    [RouterQuery.REGISTRATION]: {
      hasEmail: true,
      hasPassword: true,
      title: 'Registration',
      submitFunction: handleRegistration,
      toAuthLinks: [{
        href: '/auth',
        title: 'Have an account?'
      }]
    },
    [RouterQuery.FORGOT_PASSWORD]: {
      hasEmail: true,
      hasPassword: false,
      title: 'Forgot Password',
      submitFunction: handleReset,
      toAuthLinks: [{
        href: '/auth',
        title: 'Remember your password?'
      }]
    },
    [RouterQuery.LOGIN]: {
      hasEmail: true,
      hasPassword: true,
      title: 'Login',
      submitFunction: handleLogin,
      toAuthLinks: [{
        href: `/auth?type=${RouterQuery.REGISTRATION}`,
        title: 'Don\'t have an account?'
      },{
        href: `/auth?type=${RouterQuery.FORGOT_PASSWORD}`,
        title: 'Forgot your password?'
      }]
    }
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
      duration: TRANSITION_TIME / 1000,
      ease: 'none',
      ...shrinkHeightProperties.remove
    })
    .to(id, {
      alpha: 1,
      duration: TRANSITION_TIME / 1000,
      ease: 'none',
      ...shrinkHeightProperties.add
    })
    
    contentSwitch.play()
    setTimeout(() => {
      contentSwitch.kill()
    }, TRANSITION_TIME * 2)
  }

  useEffect(() => {
    const authType = router.asPath.split('/auth?type=')[1]

    let newTypeProps: TypePropsType

    if(authType === RouterQuery.REGISTRATION) {
      newTypeProps = typesPropsOptions[RouterQuery.REGISTRATION]

    } else if(authType === RouterQuery.FORGOT_PASSWORD) {
      newTypeProps = typesPropsOptions[RouterQuery.FORGOT_PASSWORD]

    } else {
      newTypeProps = typesPropsOptions[RouterQuery.LOGIN]
    }

    const timeoutTime = typeProps.title ? TRANSITION_TIME : 0

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
  }, [router])

  useEffect(() => {
    initGsap()

    return () => {
      tlRef?.current?.kill()
    }
  }, [])

  useEffect(() => {
    if(errorMessage) {
      tlRef.current.play()

    }
  }, [errorMessage])

  let authProps: AuthPropsType = useMemo(() => {
    if(typeProps.hasPassword) {
      return {
        password,
        handlePasswordUpdate,
        validationStatuses
      }
    }

    return 
  }, [
    typeProps.hasPassword,
    password,
    validationStatuses
  ])

  const refs = { emailRef, passwordRef }

  return (
    <Auth
      ref={refs as any}
      {...authProps}
      {...typeProps}
      errorMessage={errorMessage}
      handleAnyInputChange={handleAnyInputChange}
      // temporaryFunction={temporaryFunction}
       />
  )
}

export default AuthContainer