import Router, { useRouter } from "next/router"
import { FormEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"
import useIsInputFocused from "../../hooks/useIsInputFocused"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { supabase } from "../../utils/supabase"
import { InputOnChangeType } from "../input/Input"
import Auth from "./Auth"

type HandleAuthType = (event: FormEvent) => Promise<void>
type ToAuthLinkType = {
  href: string
  title: string
}

type PasswordPropsType = {
  password?: string;
  handlePasswordUpdate?: (event: InputOnChangeType) => void;
  isPasswordFocused?: boolean;
}

export type AuthPropsType = PasswordPropsType | undefined

export type TypePropsType = {
  hasEmail:       undefined | boolean,
  hasPassword:    undefined | boolean,
  title:          undefined | string,
  submitFunction: undefined | HandleAuthType,
  toAuthLinks:    undefined | Array<ToAuthLinkType>
}

const AuthContainer = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [typeProps, setTypeProps] = useState<TypePropsType>({
    hasEmail: undefined,
    hasPassword: undefined,
    title: undefined,
    submitFunction: undefined,
    toAuthLinks: undefined
  })
  const dispatch = useAppDispatch()
  const isPasswordFocused = useIsInputFocused(passwordRef, [typeProps.hasPassword])

  const passwordValidation = useMemo(() => {
    if(password.length > 5) {
      return true
    }

    return false
  }, [password])

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
      
      return
    }

    if(data?.session) {
      dispatch(update_userData(data.session))
      Router.push('dashboard')
    }
  }

  const handleRegistration = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    if(!passwordRef?.current || !emailRef.current) return

    const {
      data,
      error
    } = await supabase.auth.signUp({
      email: emailRef.current.value ?? '',
      password: passwordRef.current.value,
    })

    if(error) {
      console.error({
        Location: 'auth.container.tsx',
        error
      })

      return
    }

    if(data?.session) {
      dispatch(update_userData(data.session))
    }
  }, [passwordValidation])

  const handleReset = async () => {

  }

  const handlePasswordUpdate = (event: InputOnChangeType): void => {
    setPassword(event.currentTarget.value)
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

  let authProps: AuthPropsType = useMemo(() => {
    if(typeProps.hasPassword) {
      return {
        password,
        handlePasswordUpdate,
        isPasswordFocused
      }
    }

    return 
  }, [typeProps.hasPassword, isPasswordFocused, password])

  const refs = {
    emailRef,
    passwordRef
  }

  return (
    <Auth
      ref={refs as any}
      {...authProps}
      {...typeProps} />
  )
}

export default AuthContainer