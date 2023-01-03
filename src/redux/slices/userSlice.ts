import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';
import type { RootState } from '../redux_store';

// declaring the types for our state
export type userDataSlice = {
  session: Session | null
};

const initialState: userDataSlice = {
  session: null
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    update_userData: (state, action: PayloadAction<Session>) => {
      state.session = action.payload
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