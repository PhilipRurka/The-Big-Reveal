import { FC } from "react"
import { Fields, Label } from "../../styled"
import { PasswordInput } from "../passwordField/PasswordField.styled"
import { ConfirmedPasswordFieldType } from "./ConfirmedPasswordField.container"

const ConfirmedPasswordField:FC<ConfirmedPasswordFieldType> = ({ handleUpdate }) => {
  return (
    <Fields>
      <Label htmlFor="confirmed-password">
        Confirme Password
      </Label>
      <PasswordInput
        id='confirmed-password'
        type='password'
        onChange={handleUpdate} />
    </Fields>
  )
}

export default ConfirmedPasswordField