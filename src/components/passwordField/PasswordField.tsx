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
      id={AuthTransitionIds.PASSWORD} >
      <Label htmlFor="password">
        Password
      </Label>
      <PasswordInput
        id='password-input'
        type='password'
        defaultValue={password || ''}
        ref={ref}
        onChange={handlePasswordUpdate} />
        <PasswordValidation validationStatuses={validationStatuses} />
    </Fields>
  )
})

PasswordField.displayName = 'PasswordField'

export default PasswordField