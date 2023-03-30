import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux';
import type {
  AppDispatchType,
  RootState
} from './redux_store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatchType>();