import { FC } from "react"
import { ItemsSuccessStatesType } from "../../hooks/usePasswordValidation"
import PasswordValidation from "./PasswordValidation"

export type PasswordValidationType = {
  validationStatuses: ItemsSuccessStatesType
}

const PasswordValidationContainer: FC<PasswordValidationType> = ({ validationStatuses }) => {

  return <PasswordValidation validationStatuses={validationStatuses} />
}

export default PasswordValidationContainer