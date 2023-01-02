import { createClient } from "@supabase/supabase-js"
import { FC, FormEvent, useRef, useState } from "react"
import { InputOnChangeType } from "../input/Input"
import Registration from "./Registration"

export const RegistrationContainer: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )

  const handleRegistration = async (event: FormEvent) => {
    event.preventDefault()

    const {
      data,
      error
    } = await supabase.auth.signUp({
      email: emailRef.current?.value ?? '',
      password: password,
    })

    console.log({
      data,
      error
    })
  }

  const handlePasswordUpdate = (event: InputOnChangeType): void => {
    setPassword(event.currentTarget.value)
  }

  return (
    <Registration
      ref={emailRef}
      password={password}
      handlePasswordUpdate={handlePasswordUpdate}
      handleSubmit={handleRegistration} />
  )
}

export default RegistrationContainer
