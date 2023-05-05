import { FormEvent } from "react"
import { ItemsSuccessStatesType } from "../../hooks/usePasswordValidation"
import { InputOnChangeType } from "../input/Input"
import { StatusMessageTypesEnum } from "../formMessage1/FormMessage.container"

export enum RouterQueryEnum {
  REGISTRATION    = 'registration',
  FORGOT_PASSWORD = 'forgot-password',
  LOGIN           = 'login',
  RESET_PASSWORD  = 'reset-password'
}

export enum AuthTransitionIdsEnum {
  TITLE         = 'auth-title',
  EMAIL         = 'auth-email',
  PASSWORD      = 'auth-password',
  USERNAME      = 'auth-username',
  TO_AUTH_LINKS = 'auth-to-auth-links'
}

export type HandleStyledAuthType = (event: FormEvent) => void
export type HandleNarrowAuthType = () => Promise<void>

export type ToAuthLinkType = {
  href: string
  title: string
}

export type ResType = null | {
  name: string
  status: number
  message: string
}

export type PasswordPropsType = {
  password?: string;
  confirmedPassword?: string;
  handlePasswordUpdate?: (event: InputOnChangeType) => void;
  handleConfirmedPasswordUpdate?: (event: InputOnChangeType) => void;
  validationStatuses?: ItemsSuccessStatesType
}

export type AuthPropsType = PasswordPropsType | undefined

export type TypePropsType = {
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

export type RefsType = {
  emailRef?:    HTMLInputElement
  passwordRef?: HTMLInputElement
  hasUsername?: HTMLInputElement
}

export type AuthType = AuthPropsType & TypePropsType & {
  handleSubmit: HandleStyledAuthType
  disableSubmit: boolean
  removeStatusMessage: () => void
}

export type ContentSwitchAnimationType = (
  id: string,
  shrinkHeight: null | 'add' | 'remove'
) => void