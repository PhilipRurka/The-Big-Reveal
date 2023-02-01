import { FormEvent } from "react"
import { ItemsSuccessStatesType } from "../../hooks/usePasswordValidation"
import { InputOnChangeType } from "../input/Input"

export enum RouterQuery {
  REGISTRATION    = 'registration',
  FORGOT_PASSWORD = 'forgot-password',
  LOGIN           = 'login'
}

export enum AuthTransitionIds {
  TITLE         = 'auth-title',
  EMAIL         = 'auth-email',
  PASSWORD      = 'auth-password',
  TO_AUTH_LINKS = 'auth-to-auth-links'
}

export type HandleAuthType = (event: FormEvent) => Promise<void>

export type ToAuthLinkType = {
  href: string
  title: string
}

export type ErrorType = {
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
  hasEmail:       undefined | boolean,
  hasPassword:    undefined | boolean,
  title:          undefined | string,
  submitFunction: undefined | HandleAuthType,
  toAuthLinks:    undefined | Array<ToAuthLinkType>
}

export type ErrorMessageType = string | null

export type RefsType = {
  emailRef?:    HTMLInputElement
  passwordRef?: HTMLInputElement
}

export type AuthType = AuthPropsType & TypePropsType & {
  errorMessage: ErrorMessageType
  handleAnyInputChange: () => void
  // temporaryFunction: any
}

export type ContentSwitchAnimationType = (
  id: string,
  shrinkHeight: null | 'add' | 'remove'
) => void