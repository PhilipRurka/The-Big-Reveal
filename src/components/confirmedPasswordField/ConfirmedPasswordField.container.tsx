import { FC } from "react"
import ConfirmedPasswordField from "./ConfirmedPasswordField"

import type { InputOnChange } from "../input/Input.type";

export type ConfirmedPasswordFieldType = {
  handleUpdate: (event: InputOnChange) => void | undefined;
}

const ConfirmedPasswordFieldContainer:FC<ConfirmedPasswordFieldType> = ({ handleUpdate }) => {
  return <ConfirmedPasswordField handleUpdate={handleUpdate} />
}

export default ConfirmedPasswordFieldContainer