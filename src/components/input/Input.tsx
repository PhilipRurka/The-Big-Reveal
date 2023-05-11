import { forwardRef } from 'react';
import { InputStyled } from './Input.styled';

import type {
  InputRefType,
  InputType
} from './Input.type';

const Input = forwardRef<InputRefType, InputType>(({
  tabIndex = 0,
  ...rest
}, ref) => {
  return (
    <InputStyled
      {...rest}
      ref={ref}
      tabIndex={tabIndex} />
  );
});

Input.displayName = 'Input'

export default Input;