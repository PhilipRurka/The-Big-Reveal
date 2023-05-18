import type { RootState } from '../redux_store';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export type ToasterState = {
  title: string
  subtitle: string
  to?: string
}

const initialState: ToasterState = {
  title: '',
  subtitle: '',
};

const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    update_toaster: (state: ToasterState, action: PayloadAction<ToasterState>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  },
});

export const {
  update_toaster
} = toasterSlice.actions;

export const selectToast = (state: RootState) => state.toaster;

export default toasterSlice.reducer;