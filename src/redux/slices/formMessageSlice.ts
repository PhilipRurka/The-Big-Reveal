import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import formMessage from '../../components/formMessage';
import { StatusMessageTypesEnum } from '../../components/formMessage/FormMessage.container';

import type { RootState } from '../redux_store';

type Content = {
  message: string
  type: null | StatusMessageTypesEnum
}
type SingleItem = Content & {
  showMessage: boolean
}
type FormMessageState = {
  authFormMessage: SingleItem
  profileFormMessage: SingleItem
  displayPostFormMessage: SingleItem
  newPostFormMessage: SingleItem
  // editPostMessage: SingleItem
}
export type FormMessageIdOptions = keyof FormMessageState
type Id = {
  id: FormMessageIdOptions
}
type UpdateContentPayload = Content & Id

const initialSingleItem = {
  message: '',
  type: null,
  showMessage: false
}

const initialState: FormMessageState = {
  authFormMessage: initialSingleItem,
  profileFormMessage: initialSingleItem,
  displayPostFormMessage: initialSingleItem,
  newPostFormMessage: initialSingleItem,
  // editPostMessage: initialSingleItem
}

const formMessageSlice = createSlice({
  name: 'formMessage',
  initialState,
  reducers: {
    update_formMessage: (state: FormMessageState, action: PayloadAction<UpdateContentPayload>) => {
    
      state[action.payload.id] = {
        ...state[action.payload.id],
        ...action.payload,
        showMessage: true
      }
    },
    close_formMessage: (state: FormMessageState, action: PayloadAction<Id>) => {

      state[action.payload.id] = {
        ...state[action.payload.id],
          message: '',
          type: null,
          showMessage: false
      }
    }
  }
});

export const {
  update_formMessage,
  close_formMessage
} = formMessageSlice.actions;

export const selectFormMessage = (state: RootState) => state.formMessage;

export default formMessageSlice.reducer;