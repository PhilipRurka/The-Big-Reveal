import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../redux_store';

type burgerNavType = boolean

const initialState: burgerNavType = false;

const burgerNavSlice = createSlice({
  name: 'burgerNav',
  initialState,
  reducers: {
    update_burger_nav: (_, action: PayloadAction<burgerNavType>) => {
      return action.payload
    }
  },
});

export const {
  update_burger_nav
} = burgerNavSlice.actions;

export const selectBurgerNav = (state: RootState) => state.burgerNav;

export default burgerNavSlice.reducer;