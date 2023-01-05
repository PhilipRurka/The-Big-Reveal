import styled from 'styled-components';
import { Colors } from './colors-styled';
import { Container } from './layout-styled'
import { Fonts } from './typography-styled';
import { default as LinkNext } from 'next/link'
import { InputWrapper } from '../components/input/Input.styled';
import { InputType } from '../components/input/Input';

export const AuthWrapper = styled.div`
  ${Container('xs')}
  margin-top: 10vh;
  background-color: mintcream;
  padding-top: 50px;
  padding-bottom: 50px;
  box-shadow: 0 0 5px 0 black;
  border-radius: 10px;
`;

export const AuthTitle = styled.h1`
  ${Fonts.secondary};
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
    background-color: ${Colors.persimmon};
  }
`;

export const ToAuthLink = styled(LinkNext)`
  color: ${Colors.dodger};

  &:hover {
    color: ${Colors.persimmon};
  }
`;

export const PasswordInput = styled(InputWrapper)<InputType>`
  width: 440px;
  transition: width 0.2s ease;

  &:focus {
    width: 330px;
  }
`;