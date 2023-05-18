import type { FormEvent } from "react"
import type { ProfilePageData } from "../../pages/profile"
import type { InputOnChange } from "../input/Input.type"

import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container"

export type HandleSaveReset = (event: FormEvent) => void

export type ShowFormMessageType = {
  message: string
  type: null | StatusMessageTypesEnum
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
}