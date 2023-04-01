import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { Session } from '@supabase/supabase-js';
import type { RootState } from '../redux_store';
import Router from 'next/router';

export type UserDataSliceType = {
  session: Session | null
  status: UserDataStatusType
};

type UserDataStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: UserDataSliceType = {
  session: null,
  status: 'idle'
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    update_userData: {
      reducer(state, action: PayloadAction<UserDataSliceType>) {
        return {
          ...state,
          ...action.payload
        }
      },
      prepare(session: UserDataSliceType['session']) {
        if(session) {
          return { payload: {
            session,
            status: 'succeeded' as UserDataStatusType
          }}

        } else {
          console.error('useSlice Error')
          return { payload: {
            session: null,
            status: 'failed' as UserDataStatusType
          }}
        }
      }
    },
    remove_userData: state => {
      state.session = null
      Router.push('/auth')
    }
  },
});

export const {
  update_userData,
  remove_userData
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;