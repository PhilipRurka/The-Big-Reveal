import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import type { RootState } from '../redux_store';
import { statusMessage, updateFormattedMessage } from '../reducerLogic/authMessageReducers'
import { StatusMessageRequestType, StatusMessageStateType } from '../types/authMessageRedux.type';

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
    update_dynamic_message: (state: StatusMessageStateType, action) => {
      return updateFormattedMessage(state, action)
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