import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { RouterQueryEnum } from "../../components/auth/Auth.types"
import { StatusMessageTypesEnum } from "../../components/formMessage/FormMessage.container"

export type DefinedStatusMessageRequestType = {
  source: RouterQueryEnum
  status: number | undefined
  message?: string
  type: StatusMessageTypesEnum
  dynamicValue?: string | number
}

export type DefinedStatusMessageStateType = {
  showMessage: boolean
  source: RouterQueryEnum
  status: number | undefined
  type: StatusMessageTypesEnum
  defaultMessage: string
  formattedMessage: string
}

export type StatusMessageRequestType = null | DefinedStatusMessageRequestType
export type StatusMessageStateType = {} | DefinedStatusMessageStateType

export type MessageObjType = {
  defaultMessage?: string
  formattedMessage?: string
}

export type DynamicValueActionType = {
  dynamicValue: string | number
}

export type CaseReducerBuilderType<T> = CaseReducer<StatusMessageStateType, PayloadAction<T>>

export type UpdateFormattedMessageType = CaseReducerBuilderType<DynamicValueActionType['dynamicValue']>