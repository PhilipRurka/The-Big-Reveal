import gsap from "gsap"
import { forwardRef, RefObject, useCallback, useEffect, useRef } from "react"
import useIsInputFocused from "../../hooks/useIsInputFocused"
import { PasswordPropsType } from "../auth/Auth.container"
import PasswordField from "./PasswordField"

const PasswordFieldContainer = forwardRef<HTMLInputElement, PasswordPropsType>(({
  password,
  handlePasswordUpdate,
  validationStatuses
}, ref) => {

  const isPasswordFocused = useIsInputFocused(ref as RefObject<HTMLInputElement>)

  const tlRef = useRef<any>(gsap.timeline())

  const initGsap = useCallback(() => {
    tlRef.current.fromTo('#password-input', {
      width: '100%'
    },
    {
      width: '310px',
      duration: 0.3,
    }, 0)
    .fromTo('#password-validation', {
      alpha: 0,
      pointerEvents: "none"
    }, {
      alpha: 1,
      pointerEvents: "auto",
      duration: 0.3,
      ease: "power1.out"
    }, '>')
  }, [])

  useEffect(() => {
    initGsap()

    return () => {
      tlRef?.current?.kill()
    }
  }, [])

  useEffect(() => {
    if(isPasswordFocused) {
      tlRef?.current?.play()
      
    } else {
      tlRef?.current?.reverse()
    }
  }, [isPasswordFocused])

  return (
    <PasswordField
      ref={ref}
      password={password}
      handlePasswordUpdate={handlePasswordUpdate}
      validationStatuses={validationStatuses} />
  )
})

export default PasswordFieldContainer