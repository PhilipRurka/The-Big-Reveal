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
    .to('#password-validation', {
      alpha: 1,
      duration: 0.3,
      ease: "power1.out"
    }, '>')
  }, [])

  useEffect(() => {
    console.log('useEffect[]')
    initGsap()

    return () => {
      console.log('useEffect[KILL]')
      tlRef?.current?.kill()
    }
  }, [])

  useEffect(() => {
    console.log('useEffect[isPasswordFocused]')
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