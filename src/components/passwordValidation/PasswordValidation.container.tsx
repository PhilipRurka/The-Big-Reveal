import { FC } from "react"
import { ItemsSuccessStatesType } from "../../hooks/usePasswordValidation"
import PasswordValidation from "./PasswordValidation"

export type ValidationStatusesType = {
  validationStatuses: ItemsSuccessStatesType
} 

const PasswordValidationContainer: FC<ValidationStatusesType> = ({ validationStatuses }) => {

  return <PasswordValidation validationStatuses={validationStatuses} />
}

export default PasswordValidationContainer