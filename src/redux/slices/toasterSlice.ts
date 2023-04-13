import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../redux_store';
import { ToasterType } from '../../components/toaster/Toaster';

const initialState: ToasterType = {
  title: '',
  subtitle: '',
};

const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    update_toaster: (state: ToasterType, action: PayloadAction<ToasterType>) => {
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