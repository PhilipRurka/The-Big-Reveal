import styled from 'styled-components';
import { InputWrapper } from '../input/Input.styled';
import { InputType } from '../input/Input';

type PasswordInputType = InputType & {
  isPasswordFocussed: boolean | undefined
}

export const PasswordFieldWrapper = styled.div`

`;

export const PasswordInput = styled(InputWrapper)<PasswordInputType>`
  width: ${props => props.isPasswordFocussed ? '310px' : '440px'};
  transition: width 0.2s ease;
`;