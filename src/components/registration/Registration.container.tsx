import { FC, FormEvent, useRef, useState } from "react"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { supabase } from "../../utils/supabase"
import { InputOnChangeType } from "../input/Input"
import Registration from "./Registration"

export const RegistrationContainer: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleRegistration = async (event: FormEvent) => {
    event.preventDefault()

    const {
      data,
      error
    } = await supabase.auth.signUp({
      email: emailRef.current?.value ?? '',
      password: password,
    })

    if(data?.session) {
      dispatch(update_userData(data.session))
    }
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