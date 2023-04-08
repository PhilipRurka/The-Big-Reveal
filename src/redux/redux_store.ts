import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import authMessageReducer from './slices/authMessageSlice'
import toasterReducer from './slices/toasterSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    authMessage: authMessageReducer,
    toaster: toasterReducer,
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