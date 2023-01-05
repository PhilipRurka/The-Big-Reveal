import { FormEvent, forwardRef } from 'react';
import {
  InputWrapper
} from './Input.styled';

export type InputRefType = HTMLInputElement
export type InputOnChangeType = FormEvent<HTMLInputElement>

export type InputType = {
  id: string
  type: string
  value?: string
  handleChange?: (event: InputOnChangeType) => void
}

const Input = forwardRef<InputRefType, InputType>(({
  id,
  type,
  value,
  handleChange
}, ref) => {

  return (
    <InputWrapper
      ref={ref}
      id={id}
      type={type}
      value={value}
      onChange={handleChange} />
  );
});

export default Input;