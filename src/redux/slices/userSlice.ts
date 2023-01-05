import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';
import type { RootState } from '../redux_store';

// declaring the types for our state
export type UserDataSliceType = {
  session: Session | null
  isLoading: boolean
};

const initialState: UserDataSliceType = {
  session: null,
  isLoading: true
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    update_userData: (state, action: PayloadAction<UserDataSliceType['session']>) => {
      state.session = action.payload
      state.isLoading = false
    },
    remove_userData: state => {
      state.session = null
    }
  },
});

export const {
  update_userData,
  remove_userData
} = userDataSlice.actions;

export const selectUserData = (state: RootState) => state.userData;

export default userDataSlice.reducer;