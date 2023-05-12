import { forwardRef } from 'react';
import { InputStyled } from './Input.styled';

import type {
  InputRefType,
  InputType
} from './Input.type';

const Input = forwardRef<InputRefType, InputType>(({
  tabIndex = 0,
  handleChange,
  ...rest
}, ref) => {
  return (
    <InputStyled
      {...rest}
      ref={ref}
      onChange={handleChange}
      tabIndex={tabIndex} />
  );
});

Input.displayName = 'Input'

export default Input;