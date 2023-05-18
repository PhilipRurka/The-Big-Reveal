import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import authMessageReducer from './slices/authMessageSlice'
import toasterReducer from './slices/toasterSlice'
import burgerNavReducer from './slices/burgerNavSlice'
import postReducer from './slices/postSlice'
import formMessageReducer from './slices/formMessageSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    authMessage: authMessageReducer,
    toaster: toasterReducer,
    burgerNav: burgerNavReducer,
    post: postReducer,
    formMessage: formMessageReducer,
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