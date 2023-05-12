import { RouterQueryEnum } from "../../components/auth/Auth.enum"
import { StatusMessageTypesEnum } from "../../components/formMessage/FormMessage.container"
import { profileErrorMessages } from "../../../lib/profileAPI/post/profile.utils"

import type { PayloadAction } from "@reduxjs/toolkit"
import type {
  StatusMessageState,
  MessageObj,
  StatusMessageRequest,
  UpdateFormattedMessage,
  DefinedStatusMessageState,
} from "../types/authMessageRedux.type"
import { ConstraintErrorContent } from "../../../lib/generalErrors"

export const statusMessage = {
  reducer(state: StatusMessageState, action: PayloadAction<StatusMessageState>) {
    if(!Object.keys(action.payload).length) return { payload: {} }

    return {
      ...state,
      ...action.payload
    }
  },
  prepare(authMessageObj: StatusMessageRequest) {
    if(!authMessageObj) return { payload: {} }

    const {
      source,
      status,
      message,
      type,
      dynamicValue
    } = authMessageObj

    const messagesObj: MessageObj = {
      defaultMessage: '',
      formattedMessage: ''
    }

    if(message === 'Email rate limit exceeded') {
      messagesObj.defaultMessage = message

    } else if(source === RouterQueryEnum.LOGIN) {
      if(status === 400) {
        messagesObj.defaultMessage = 'Invalid Cradential'

      } else if(status) {
        messagesObj.defaultMessage = 'Something went wrong on our end (server issue). Refresh the page and try again'
      }

    } else if(source === RouterQueryEnum.REGISTRATION) {
      if(message === 'Signups not allowed for this instance') {
        messagesObj.defaultMessage = `Account creations is disabled at this time`

      } else if(status === 422) {
        messagesObj.defaultMessage = `Invalid Email Format`

      } else if(status === 429) {
        messagesObj.defaultMessage = 'You must wait ${} seconds before you can submit another registration request'

      } else if(type === StatusMessageTypesEnum.SUCCESS) {
        messagesObj.defaultMessage = 'A registration has been sent to ${}'

      } else if(message?.includes((profileErrorMessages.usernameLength as ConstraintErrorContent).constraint)) {
        messagesObj.defaultMessage = profileErrorMessages.usernameLength.message
    
      } else if(message?.includes((profileErrorMessages.usernameFormating as ConstraintErrorContent).constraint)) {
        messagesObj.defaultMessage = profileErrorMessages.usernameFormating.message

      } else if(message?.includes('profiles_path_key')) {
        messagesObj.defaultMessage = profileErrorMessages.usernameAlreadyExists.message
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
      ...messagesObj,
      showMessage: true,
      source,
      status,
      type,
    }}
  }
}

export const updateFormattedMessage: UpdateFormattedMessage = (state, { payload }) => {
  const definedState = { ...state as DefinedStatusMessageState }

  if(!definedState.defaultMessage || !payload) return

  const formattedMessage = definedState.defaultMessage.split('${}').join(payload.toString())

  return {
    ...definedState,
    formattedMessage
  }
}