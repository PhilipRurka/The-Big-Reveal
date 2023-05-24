import { RouterQueryEnum } from "../../components/auth/Auth.enum"

import type {
  CaseReducer,
  PayloadAction
} from "@reduxjs/toolkit"
import type { StatusMessageTypesEnum } from "../../components/formMessage/FormMessage.container"

type DefinedStatusMessageShared = {
  source: RouterQueryEnum
  status: number | undefined
  type: StatusMessageTypesEnum
}

type DynamicValueAction = {
  dynamicValue: string | number
}

type CaseReducerBuilder<T> = CaseReducer<StatusMessageState, PayloadAction<T>>

type DefinedStatusMessageRequest = DefinedStatusMessageShared & {
  message?: string
  dynamicValue?: string | number
}

export type DefinedStatusMessageState = MessageObj & DefinedStatusMessageShared & {
  showMessage: boolean
}

export type StatusMessageRequest = null | DefinedStatusMessageRequest
export type StatusMessageState = {} | DefinedStatusMessageState

export type MessageObj = {
  defaultMessage: string
  formattedMessage: string
}

export type UpdateFormattedMessage = CaseReducerBuilder<DynamicValueAction['dynamicValue']>