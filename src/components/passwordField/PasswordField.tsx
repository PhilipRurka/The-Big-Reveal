import { forwardRef } from "react"
import { Fields, Label } from "../../styled"
import { PasswordPropsType } from "../auth/Auth.container"
import PasswordValidation from "../passwordValidation"
import { PasswordInput } from "./PasswordField.styled"

type PasswordFieldType = PasswordPropsType & {
  isPasswordFocused: boolean
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldType>(({
  password,
  handlePasswordUpdate,
  isPasswordFocused,
  validationStatuses
}, ref) => {

  return (
    <Fields>
      <Label htmlFor="password">
        Password
      </Label>
      <PasswordInput
        id='password'
        type='password'
        value={password}
        ref={ref}
        onChange={handlePasswordUpdate}
        isPasswordFocussed={isPasswordFocused} />
        {validationStatuses && (
          <PasswordValidation
            validationStatuses={validationStatuses}
            isPasswordFocused={isPasswordFocused || false}/>
        )}
    </Fields>
  )
})

export default PasswordField