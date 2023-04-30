import styled, { css } from 'styled-components';
import { Colors } from './colors-styled';

type ButtonType = {
  colorType: keyof typeof buttonColors
}

const buttonColors =  {
  primary: {
    default: Colors.dodger,
    hover: Colors.eucalyptus,
    disabled: Colors.persimmon
  }
} as const

const buttonTypes = (type: keyof typeof buttonColors): string => {
  const color = buttonColors[type]
  return `
    background-color: ${color.default};

    &:hover {
      background-color: ${color.hover};
    }

    &[disabled] {
      background-color: ${color.disabled}
    }
  `
}

export const ButtonStyled = styled.div`
  display: flex;
  margin-top: 20px;

  & > button {
    margin-left: 20px;
    
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Button = styled.button<ButtonType>(({ colorType }) => {
  return css`
    ${buttonTypes(colorType)}
    background-color: ${Colors.dodger};
    color: white;
    padding: 10px 24px;
    font-size: 16px;
    letter-spacing: 1px;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  
    &[disabled] {
      cursor: not-allowed;
    }
  `
});