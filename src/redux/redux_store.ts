import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import userDataReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    userData: userDataReducer
  },
});

export type AppDispatchType = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;