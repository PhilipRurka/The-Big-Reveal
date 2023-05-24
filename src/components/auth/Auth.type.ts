import type { FormEvent } from "react"
import type { ItemsSuccessStatesType } from "../../hooks/usePasswordValidation"
import type { InputOnChange } from "../input/Input.type"

import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container"
import { RouterQueryEnum } from "./Auth.enum"
import { AUTH_TYPE_OPTIONS } from "./Auth.constant"

export type AuthPageData = AuthContainerProps

export type RouterAuthOptions = keyof typeof AUTH_TYPE_OPTIONS

export type AuthTypeOptionsType = typeof AUTH_TYPE_OPTIONS[RouterQueryEnum.LOGIN]

export type AuthContainerProps = AuthTypeOptionsType & {
  initRouterAuthType: RouterAuthOptions
}

export type HandleAuthSubmit = (event: FormEvent) => void

export type HandleNarrowAuthFunction = () => Promise<void>

export type ToAuthLinkType = {
  href: string
  title: string
}

export type Res = null | {
  name: string
  status: number
  message: string
}

export type PasswordPropsType = {
  password?: string;
  confirmedPassword?: string;
  handlePasswordUpdate?: (event: InputOnChange) => void;
  handleConfirmedPasswordUpdate?: (event: InputOnChange) => void;
  validationStatuses?: ItemsSuccessStatesType
}

export type AuthAddedProps = PasswordPropsType | undefined

export type CurrentOption = {
  id:                       undefined | string
  hasEmail:                 undefined | boolean
  hasPassword:              undefined | boolean
  hasConfirmedPassword:     undefined | boolean
  hasPasswordValidation:    undefined | boolean
  hasUsername:              undefined | boolean
  title:                    undefined | string
  toAuthLinks:              undefined | Array<ToAuthLinkType>
}

export type StatusMessageType = null | {
  source: RouterQueryEnum
  type: StatusMessageTypesEnum
  status: number
  showMessage: boolean
  message?: string
}

export type Refs = {
  emailRef?:    HTMLInputElement
  passwordRef?: HTMLInputElement
  hasUsername?: HTMLInputElement
}

export type AuthProps = AuthAddedProps & CurrentOption & {
  handleSubmit: HandleAuthSubmit
  disableSubmit: boolean
  removeStatusMessage: () => void
}

export type ContentSwitchAnimation = (
  id: string,
  shrinkHeight: null | 'add' | 'remove'
) => void