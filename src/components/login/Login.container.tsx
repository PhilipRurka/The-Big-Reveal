import { FC, FormEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { supabase } from "../../utils/supabase"
import { InputOnChangeType } from "../input/Input"
import Login from "./Login"
import Router from "next/router"
import useIsInputFocused from "../../hooks/useIsInputFocused"

export const LoginContainer: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const isPasswordFocused = useIsInputFocused(passwordRef)

  const refs = {
    emailRef,
    passwordRef
  }

  const handleLogin = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value ?? '',
      password: password,
    })

    if(error) {
      console.error({
        Location: 'Login.container.tsx',
        error
      })
    }

    if(data?.session) {
      dispatch(update_userData(data.session))
      Router.push('dashboard')
    }
  }

  const handlePasswordUpdate = (event: InputOnChangeType): void => {
    setPassword(event.currentTarget.value)
  }

  return (
    <Login
      ref={refs as any}
      password={password}
      handlePasswordUpdate={handlePasswordUpdate}
      handleSubmit={handleLogin}
      isPasswordFocussed={isPasswordFocused} />
  )
}

export default LoginContainer