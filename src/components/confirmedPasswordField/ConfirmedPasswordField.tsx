import { FC } from "react"
import { Field, Label } from "../../styled"
import { PasswordInput } from "../passwordField/PasswordField.styled"
import { ConfirmedPasswordFieldType } from "./ConfirmedPasswordField.container"

const ConfirmedPasswordField:FC<ConfirmedPasswordFieldType> = ({ handleUpdate }) => {
  return (
    <Field>
      <Label htmlFor="confirmed-password">
        Confirme Password
      </Label>
      <PasswordInput
        id='confirmed-password'
        type='password'
        onChange={handleUpdate} />
    </Field>
  )
}

export default ConfirmedPasswordField