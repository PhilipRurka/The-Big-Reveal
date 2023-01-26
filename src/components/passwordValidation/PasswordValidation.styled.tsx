import styled from 'styled-components';
import { Colors, Fonts } from '../../styled';

type ConditionItemType = {
  isSuccess: boolean
}

export const PasswordValidationWrapper = styled.div`
  position: absolute;
  top: 0;
  right: -50px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 5px 0 black;
  opacity: 0;
`;

export const ConditionsTitle = styled.ul`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const ConditionList = styled.ul`

`;

export const ConditionItem = styled.li<ConditionItemType>`
  position: relative;
  font-style: italic;
  font-size: 14px;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
  padding-left: 18px;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: calc(50% + 1px);
    left: 0;
    transform: translateY(-50%);
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${props => props.isSuccess ? Colors.eucalyptus : Colors.persimmon};
  }
`;