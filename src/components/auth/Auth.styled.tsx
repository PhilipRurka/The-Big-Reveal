import styled from 'styled-components';
import { Colors } from '../../styled/colors-styled';
import { Container } from '../../styled/layout-styled'
import { default as LinkNext } from 'next/link'
import { InputWrapper } from '../input/Input.styled';
import { InputType } from '../input/Input';

type PasswordInputType = InputType & {
  isPasswordFocussed: boolean | undefined
}

export const AuthWrapper = styled.div`
  max-width: 616px;
  margin: auto;
  padding: 50px;
  margin-top: 10vh;
  background-color: mintcream;
  box-shadow: 0 0 5px 0 black;
  border-radius: 10px;
`;

export const AuthTitle = styled.h1`
  font-size: 64px;
  text-align: center;
  margin-bottom: 30px;
`;

export const Form = styled.form`

`;

export const SubmitButton = styled.button`
  background-color: ${Colors.dodger};
  color: white;
  padding: 10px 24px;
  margin: 20px auto 40px;
  font-size: 16px;
  letter-spacing: 1px;
  border-radius: 5px;
  
  &:hover {
    background-color: ${Colors.eucalyptus};
  }

  &[disabled] {
    background-color: #ff5b5c;
    cursor: not-allowed;
  }
`;

export const ToAuthLinkWrapper = styled.div`
  
`;

export const ToAuthLinkItem = styled(LinkNext)`
  display: inline-block;
  color: ${Colors.dodger};

  &:hover {
    color: ${Colors.persimmon};
  }
`;

export const PasswordInput = styled(InputWrapper)<PasswordInputType>`
  width: ${props => props.isPasswordFocussed ? '310px' : '440px'};
  transition: width 0.2s ease;
`;