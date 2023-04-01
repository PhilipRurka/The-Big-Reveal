import { PayloadAction } from "@reduxjs/toolkit"
import { RouterQueryEnum, StatusMessageTypesEnum } from "../../components/auth/Auth.types"
import {
  DefinedStatusMessageRequestType,
  StatusMessageStateType,
  MessageObjType,
  StatusMessageRequestType,
  UpdateFormattedMessageType,
  DefinedStatusMessageStateType,
} from "../types/authMessageRedux.type"

export const statusMessage = {
  reducer(state: StatusMessageStateType, action: PayloadAction<StatusMessageStateType>) {
    if(!Object.keys(action.payload).length) return { payload: {} }

    return {
      ...state,
      ...action.payload
    }
  },
  prepare(authMessageObj: StatusMessageRequestType) {
    if(!authMessageObj) return { payload: {} }

    const {
      source,
      status,
      message,
      type,
      dynamicValue
    } = authMessageObj as DefinedStatusMessageRequestType

    const messagesObj: MessageObjType = {}

    if(message === 'Email rate limit exceeded') {
      messagesObj.defaultMessage = message

    } else if(source === RouterQueryEnum.LOGIN) {
      if(status === 400) {
        messagesObj.defaultMessage = 'Invalid Cradential'

      } else if(status) {
        messagesObj.defaultMessage = 'Something went wrong on our end (server issue). Refresh the page and try again'
      }

    } else if(source === RouterQueryEnum.REGISTRATION) {
      if(status === 422) {
        messagesObj.defaultMessage = `Invalid Email Format`

      } else if(status === 429) {
        messagesObj.defaultMessage = 'You must wait ${} seconds before you can submit another registration request'

      } else if(type === StatusMessageTypesEnum.SUCCESS) {
        messagesObj.defaultMessage = 'A registration has been sent to ${}'
      }

    } else if(source === RouterQueryEnum.FORGOT_PASSWORD) {
      if(message === 'Password recovery requires an email') {
        messagesObj.defaultMessage = 'An email is required!'

      } else if(message === 'Unable to validate email address: invalid format') {
        messagesObj.defaultMessage = 'Invalid Email'

      } else if(status === 429) {
        messagesObj.defaultMessage = 'For security purposes, you can only request this once every 60 seconds.'

      } else if(type === StatusMessageTypesEnum.SUCCESS) {
        messagesObj.defaultMessage = 'A registration has been sent to ${}'
      }

    } else if(source === RouterQueryEnum.RESET_PASSWORD) {
      /** Something soon? */

    } else {
      messagesObj.defaultMessage = 'Something went wrong! Oh no!'
    }

    if(dynamicValue) {
      if(messagesObj.defaultMessage) {
        messagesObj.formattedMessage = messagesObj.defaultMessage.split('${}').join(dynamicValue.toString())
      }

    } else {
      messagesObj.formattedMessage = messagesObj.defaultMessage
    }

    return { payload: {
      showMessage: true,
      source,
      status,
      type,
      defaultMessage: messagesObj.defaultMessage,
      formattedMessage: messagesObj.formattedMessage
    }}
  }
}

export const updateFormattedMessage: UpdateFormattedMessageType = (state, { payload }) => {
  const definedState = { ...state as DefinedStatusMessageStateType }

  if(!definedState.defaultMessage || !payload) return

  const formattedMessage = definedState.defaultMessage.split('${}').join(payload.toString())

  return {
    ...definedState,
    formattedMessage
  }
}