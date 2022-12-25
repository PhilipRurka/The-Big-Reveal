import { useSession } from "@supabase/auth-helpers-react"
import { createClient } from "@supabase/supabase-js"
import { FC, useRef, useState } from "react"
import { InputOnChangeType } from "../input/Input"
import Login from "./Login"

export const LoginContainer: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const session = useSession()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )

  const handleLogin = async () => {
    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value ?? '',
      password: password,
    })
  }

  const handlePasswordUpdate = (event: InputOnChangeType): void => {
    setPassword(event.currentTarget.value)
  }

  return (
    <Login
      session={session}
      supabase={supabase}
      ref={emailRef}
      password={password}
      handlePasswordUpdate={handlePasswordUpdate} />
  )

}

export default LoginContainer