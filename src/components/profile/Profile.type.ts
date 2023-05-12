import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container"

import type { FormEvent } from "react"
import type { ProfilePageData } from "../../pages/profile"
import type { FormMessageContainerType } from "../formMessage/FormMessage.container"
import type { InputOnChange } from "../input/Input.type"

export type HandleSaveReset = (event: FormEvent) => void

export type ShowFormMessageType = {
  message: string
  type: undefined | StatusMessageTypesEnum
}

export type ProfileContainerProps = ProfilePageData

export type ProfileProps = {
  subtitle: string
  fullName: null | string
  username: null | string
  handleFullNameUpdate: (event: InputOnChange) => void
  handleUserNameUpdate: (event: InputOnChange) => void
  handleSave: HandleSaveReset
  handleReset: HandleSaveReset
  hasChangeOccured: boolean
  formMessageProps: FormMessageContainerType
}