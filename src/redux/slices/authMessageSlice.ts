import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../redux_store';
import { RouterQueryEnum, StatusMessageType, StatusMessageTypesEnum } from '../../components/auth/Auth.types'

type DynamicValueActionType = {
  action: {
    dynamicValue: string    
  }
}

type DefinedStatusMessageRequestType = {
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
  dynamicValue: string | number
  defaultMessage: string
  formattedMessage: string
}

type StatusMessageRequestType = null | DefinedStatusMessageRequestType
type StatusMessageStateType = {} | DefinedStatusMessageStateType

type MessageObjType = {
  defaultMessage?: string
  formattedMessage?: string
}

const initialState: StatusMessageStateType = {}

const authMessageSlice = createSlice({
  name: 'authMessage',
  initialState,
  reducers: {
    status_message: {
      reducer(state, action: PayloadAction<StatusMessageStateType>) {
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

        if(source === RouterQueryEnum.LOGIN) {
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
            messagesObj.defaultMessage = 'You must wait ${} seconds before you can submit another registration request'

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
    },
    // update_dynamic_message: {
    //   reducer(state, action: PayloadAction<DynamicValueActionType>) {
    //     return {}
    //   },

    //   prepare() {
    //     return {}
    //   }
    // },

    hide_message: state => {
      return {
        ...state,
        showMessage: false
      }
    }
  }
})

export const {
  status_message,
  hide_message
} = authMessageSlice.actions;

export const selectAuthMessage = (state: RootState) => state.authMessage;

export default authMessageSlice.reducer;