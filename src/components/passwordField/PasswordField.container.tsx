import gsap from "gsap"
import { forwardRef, RefObject, useCallback, useEffect, useRef } from "react"
import useIsInputFocused from "../../hooks/useIsInputFocused"
import type { PasswordPropsType } from "../auth/Auth.types"
import PasswordField from "./PasswordField"

export type PasswordFieldType = PasswordPropsType & {
  hasPassword: undefined | boolean
}

type PasswordFieldContainerType = PasswordFieldType & {
  hasPasswordValidation: undefined | boolean
}

const PasswordFieldContainer = forwardRef<HTMLInputElement, PasswordFieldContainerType>(({
  password,
  handlePasswordUpdate,
  validationStatuses,
  hasPassword,
  hasPasswordValidation
}, forwardRef) => {
  const isPasswordFocused = useIsInputFocused(forwardRef as RefObject<HTMLInputElement>)

  const tlRef = useRef<gsap.core.Timeline>(gsap.timeline())

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

    const tlScoped = tlRef?.current

    return () => {
      tlScoped?.kill()
    }
  }, [initGsap])

  useEffect(() => {
    if(isPasswordFocused && hasPasswordValidation) {
      tlRef.current.play()
      
    } else {
      tlRef.current.reverse()
    }
  }, [isPasswordFocused, hasPasswordValidation])

  return (
    <PasswordField
      ref={forwardRef}
      password={password}
      handlePasswordUpdate={handlePasswordUpdate}
      validationStatuses={validationStatuses}
      hasPassword={hasPassword} />
  )
})

PasswordFieldContainer.displayName = 'PasswordFieldContainer'

export default PasswordFieldContainer