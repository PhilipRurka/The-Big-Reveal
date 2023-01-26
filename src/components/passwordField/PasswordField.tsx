import { forwardRef } from "react"
import { Fields, Label } from "../../styled"
import { PasswordPropsType } from "../auth/Auth.container"
import PasswordValidation from "../passwordValidation"
import { PasswordInput } from "./PasswordField.styled"

type PasswordFieldType = PasswordPropsType

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldType>(({
  password,
  handlePasswordUpdate,
  validationStatuses
}, ref) => {

  return (
    <Fields>
      <Label htmlFor="password">
        Password
      </Label>
      <PasswordInput
        id='password-input'
        type='password'
        value={password}
        ref={ref}
        onChange={handlePasswordUpdate} />
        {validationStatuses && (
          <PasswordValidation validationStatuses={validationStatuses} />
        )}
    </Fields>
  )
})

export default PasswordField