import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import authMessageReducer from './slices/authMessageSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    authMessage: authMessageReducer
  }
});

export type AppDispatchType = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;