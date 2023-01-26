import gsap from "gsap"
import { FC, MutableRefObject, useCallback, useEffect, useRef } from "react"
import { ItemsSuccessStatesType } from "../../hooks/usePasswordValidation"
import PasswordValidation from "./PasswordValidation"

export type ValidationStatusesType = {
  validationStatuses: ItemsSuccessStatesType
}

type PasswordValidationType = ValidationStatusesType & {
  isPasswordFocused: boolean
}
  

const PasswordValidationContainer: FC<PasswordValidationType> = ({
  validationStatuses,
  isPasswordFocused
}) => {
  const tlRef: MutableRefObject<GSAPAnimation | undefined> = useRef()

  const initGsap = useCallback(() => {
    tlRef.current = gsap.fromTo('#password-validation', {
      alpha: 0
    }, {
      paused: true,
      alpha: 1,
      duration: 0.2,
      ease: "power1.out"
    })
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
  }), [isPasswordFocused]

  return <PasswordValidation validationStatuses={validationStatuses} />
}

export default PasswordValidationContainer