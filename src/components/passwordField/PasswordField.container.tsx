import { forwardRef, RefObject } from "react"
import useIsInputFocused from "../../hooks/useIsInputFocused"
import { PasswordPropsType } from "../auth/Auth.container"
import PasswordField from "./PasswordField"

const PasswordFieldContainer = forwardRef<HTMLInputElement, PasswordPropsType>(({
  password,
  handlePasswordUpdate,
  validationStatuses
}, ref) => {

  const isPasswordFocused = useIsInputFocused(ref as RefObject<HTMLInputElement>)

  return (
    <PasswordField
      ref={ref}
      password={password}
      handlePasswordUpdate={handlePasswordUpdate}
      validationStatuses={validationStatuses}
      isPasswordFocused={isPasswordFocused} />
  )
})

export default PasswordFieldContainer