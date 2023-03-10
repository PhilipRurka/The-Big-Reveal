import { FC } from "react"
import { InputOnChangeType } from "../input/Input";
import ConfirmedPasswordField from "./ConfirmedPasswordField"

export type ConfirmedPasswordFieldType = {
  handleUpdate: (event: InputOnChangeType) => void | undefined;
}

const ConfirmedPasswordFieldContainer:FC<ConfirmedPasswordFieldType> = ({ handleUpdate }) => {
  return <ConfirmedPasswordField handleUpdate={handleUpdate} />
}

export default ConfirmedPasswordFieldContainer