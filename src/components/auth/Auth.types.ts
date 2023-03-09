import { FormEvent } from "react"
import { ItemsSuccessStatesType } from "../../hooks/usePasswordValidation"
import { InputOnChangeType } from "../input/Input"

export enum RouterQuery {
  REGISTRATION    = 'registration',
  FORGOT_PASSWORD = 'forgot-password',
  LOGIN           = 'auth'
}

export enum AuthTransitionIds {
  TITLE         = 'auth-title',
  EMAIL         = 'auth-email',
  PASSWORD      = 'auth-password',
  TO_AUTH_LINKS = 'auth-to-auth-links'
}

export enum StatusMessageTypesEnum {
  SUCCESS = 'success',
  ERROR   = 'error'
}

export type HandleWrapperAuthType = (event: FormEvent) => void
export type HandleNarrowAuthType = () => Promise<void>

export type ToAuthLinkType = {
  href: string
  title: string
}

export type ResType = {
  name?: string
  status?: number
}

export type PasswordPropsType = {
  password?: string;

  handlePasswordUpdate?: (event: InputOnChangeType) => void;
  validationStatuses?: ItemsSuccessStatesType
}

export type AuthPropsType = PasswordPropsType | undefined

export type TypePropsType = {
  id:                       undefined | string
  hasEmail:                 undefined | boolean
  hasPassword:              undefined | boolean
  hasPasswordValidation:    undefined | boolean
  title:                    undefined | string
  toAuthLinks:              undefined | Array<ToAuthLinkType>
}

export type StatusMessageType = null | {
  type: StatusMessageTypesEnum
  showMessage: boolean
  message: string
}

export type RefsType = {
  emailRef?:    HTMLInputElement
  passwordRef?: HTMLInputElement
}

export type AuthType = AuthPropsType & TypePropsType & {
  handleSubmit: HandleWrapperAuthType
  statusMessage: StatusMessageType
  disableSubmit: boolean
  removeStatusMessage: () => void
}

export type ContentSwitchAnimationType = (
  id: string,
  shrinkHeight: null | 'add' | 'remove'
) => void

export type ResMessageType = {
  statusType: undefined | StatusMessageTypesEnum
}

export type ExpandedResType = ResType & {
  message?: string
}