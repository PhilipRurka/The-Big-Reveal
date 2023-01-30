import gsap from "gsap"
import Router, { useRouter } from "next/router"
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import usePasswordValidation from "../../hooks/usePasswordValidation"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { supabase } from "../../utils/supabase"
import { InputOnChangeType } from "../input/Input"
import Auth from "./Auth"
import type {
  AuthPropsType,
  ErrorMessageType,
  ErrorType,
  HandleAuthType,
  TypePropsType
} from "./Auth.types"

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
      duration: 0.3,
      ease: 'power1.out'
    }, 0)
    .fromTo('#error-message', {
      alpha: 0
    }, {
      alpha: 1,
      duration: 0.3,
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
    setTimeout(() => setErrorMessage(null), 600)
  }

  useEffect(() => {
    const authType = router.query.type

    if(authType === 'registration') {
      setTypeProps({
        hasEmail: true,
        hasPassword: true,
        title: 'Registration',
        submitFunction: handleRegistration,
        toAuthLinks: [{
          href: '/auth',
          title: 'Have an account?'
        }]
      })

    } else if(authType === 'reset') {
      setTypeProps({
        hasEmail: true,
        hasPassword: false,
        title: 'Forgot Password',
        submitFunction: handleReset,
        toAuthLinks: [{
          href: '/auth',
          title: 'Remember your password?'
        }]
      })

    } else {
      setTypeProps({
        hasEmail: true,
        hasPassword: true,
        title: 'Login',
        submitFunction: handleLogin,
        toAuthLinks: [{
          href: '/auth?type=registration',
          title: 'Don\'t have an account?'
        },{
          href: '/auth?type=reset',
          title: 'Forgot your password?'
        }]
      })
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