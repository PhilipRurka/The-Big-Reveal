import { ChangeEvent, forwardRef } from 'react';
import {
  InputStyled
} from './Input.styled';

export type InputRefType = HTMLInputElement
export type InputOnChangeType = ChangeEvent<HTMLInputElement>

export type InputType = {
  id: string
  type: string
  value?: string | number
  tabIndex?: number
  handleChange?: (event: InputOnChangeType) => void
  defaultValue?: string | number
}

const Input = forwardRef<InputRefType, InputType>(({
  id,
  type,
  value,
  tabIndex = 0,
  handleChange,
  defaultValue
}, ref) => {
  return (
    <InputStyled
      ref={ref}
      id={id}
      type={type}
      value={value}
      onChange={handleChange}
      tabIndex={tabIndex}
      defaultValue={defaultValue} />
  );
});

Input.displayName = 'Input'

export default Input;