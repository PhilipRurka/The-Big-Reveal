import { FC, FormEvent, useRef, useState } from "react"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { supabase } from "../../utils/supabase"
import { InputOnChangeType } from "../input/Input"
import Login from "./Login"
import Router from "next/router"

export const LoginContainer: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleLogin = async (event: FormEvent) => {
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
      ref={emailRef}
      password={password}
      handlePasswordUpdate={handlePasswordUpdate}
      handleSubmit={handleLogin} />
  )
}

export default LoginContainer