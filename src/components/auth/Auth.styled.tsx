import styled from 'styled-components';
import { Colors } from '../../styled/colors-styled';
import { default as LinkNext } from 'next/link'
import { Button } from '../../styled/button';

export const AuthStyled = styled.div`
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
  margin-bottom: 15px;
`;

export const Form = styled.form`
  margin-top: 15px;
`;

export const ToAuthLinkStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ToAuthLinkItem = styled(LinkNext)`
  display: inline-block;
  color: ${Colors.dodger};

  &:hover {
    color: ${Colors.persimmon};
  }
`;

export const SubmitButton = styled(Button)`
  margin: 20px auto 40px;
`;

export const FieldContainer = styled.div`
  margin-top: 20px;
`;