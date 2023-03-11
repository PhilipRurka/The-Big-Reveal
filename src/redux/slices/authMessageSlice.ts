import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import type { RootState } from '../redux_store';
import { RouterQueryEnum, StatusMessageTypesEnum } from '../../components/auth/Auth.types'
import { statusMessage, updateFormattedMessage } from '../reducerLogic/authMessageReducers'

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

type DynamicValueActionType = {
  dynamicValue: string | number
}

type CaseReducerBuilderType<T> = CaseReducer<StatusMessageStateType, PayloadAction<T>>

export type UpdateFormattedMessageType = CaseReducerBuilderType<DynamicValueActionType['dynamicValue']>

const initialState: StatusMessageStateType = {}

const authMessageSlice = createSlice({
  name: 'authMessage',
  initialState,
  reducers: {
    status_message: {
      reducer(state: StatusMessageStateType, action: PayloadAction<StatusMessageStateType>) {
        return statusMessage.reducer(state, action)
      },
      prepare(authMessageObj: StatusMessageRequestType) {
        return statusMessage.prepare(authMessageObj)
      }
    },
    update_dynamic_message: (state: StatusMessageStateType, payload) => {
      return updateFormattedMessage(state, payload)
    },

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
  update_dynamic_message,
  hide_message
} = authMessageSlice.actions;

export const selectAuthMessage = (state: RootState) => state.authMessage;

export default authMessageSlice.reducer;