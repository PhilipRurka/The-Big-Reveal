import { forwardRef } from "react"
import { Fields, Label } from "../../styled"
import { AuthTransitionIds } from "../auth/Auth.types"
import PasswordValidation from "../passwordValidation"
import { PasswordFieldType } from "./PasswordField.container"
import { PasswordInput } from "./PasswordField.styled"

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldType>(({
  password,
  handlePasswordUpdate,
  validationStatuses,
  hasPassword
}, ref) => {

  return (
    <Fields
      hide={!hasPassword}
      id={AuthTransitionIds.PASSWORD}
      aria-hidden={!hasPassword} >
      <Label htmlFor="password">
        Password
      </Label>
      <PasswordInput
        id='password-input'
        type='password'
        ref={ref}
        onChange={handlePasswordUpdate}
        tabIndex={!hasPassword ? -1 : 0} />
        <PasswordValidation validationStatuses={validationStatuses} />
    </Fields>
  )
})

PasswordField.displayName = 'PasswordField'

export default PasswordField