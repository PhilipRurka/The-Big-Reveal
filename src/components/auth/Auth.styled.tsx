import styled from 'styled-components';
import { Colors } from '../../styled/colors-styled';
import { default as LinkNext } from 'next/link'

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
  margin-bottom: 15px;
`;

export const Form = styled.form`
  margin-top: 15px;
`;

export const SubmitButton = styled.button`
  background-color: ${Colors.dodger};
  color: white;
  padding: 10px 24px;
  margin: 20px auto 40px;
  font-size: 16px;
  letter-spacing: 1px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${Colors.eucalyptus};
  }

  &[disabled] {
    background-color: ${Colors.persimmon};
    cursor: not-allowed;
  }
`;

export const ToAuthLinkWrapper = styled.div`
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