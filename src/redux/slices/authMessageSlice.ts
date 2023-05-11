import {
  createSlice,
} from '@reduxjs/toolkit';
import {
  statusMessage,
  updateFormattedMessage
} from '../reducerLogic/authMessageReducers'

import type { RootState } from '../redux_store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  StatusMessageRequest,
  StatusMessageState
} from '../types/authMessageRedux.type';

const initialState: StatusMessageState = {}

const authMessageSlice = createSlice({
  name: 'authMessage',
  initialState,
  reducers: {
    status_message: {
      reducer(state: StatusMessageState, action: PayloadAction<StatusMessageState>) {
        return statusMessage.reducer(state, action)
      },
      prepare(authMessageObj: StatusMessageRequest) {
        return statusMessage.prepare(authMessageObj)
      }
    },
    update_dynamic_message: (state: StatusMessageState, action) => {
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