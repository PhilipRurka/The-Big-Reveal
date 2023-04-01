import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { Session } from '@supabase/auth-helpers-react'
import type { RootState } from '../redux_store';
import Router from 'next/router';

export type UserDataSliceType = {
  session: Session | null
  status: UserDataStatusType
};

type UserDataStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const PUBLIC_PATHS = [
  '/',
  '/auth'
]

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
          const status: UserDataStatusType = 'succeeded'

          return { payload: {
            session,
            status
          }}

        } else {
          console.error('useSlice Error')
          const status: UserDataStatusType = 'failed'

          return { payload: {
            session: null,
            status
          }}
        }
      }
    },
    remove_userData: {
      reducer(state, action: PayloadAction<any> ) {
        return {
          ...state,
          ...action.payload
        }
      },
      prepare(router) {
        const status: UserDataStatusType = 'idle'
        let isPublic = false

        for (let i = 0; i < PUBLIC_PATHS.length; i++) {
          const publicPath = PUBLIC_PATHS[i];
          if(publicPath === router.asPath) {
            isPublic = true
            break
          }
        }

        if(!isPublic) {
          Router.push('/auth')
        }
        
        return { payload: {
          session: null,
          status
        }}
      }
    }
  },
});

export const {
  update_userData,
  remove_userData
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;