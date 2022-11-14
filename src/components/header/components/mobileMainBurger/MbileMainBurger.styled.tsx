import styled, { css } from "styled-components";

export const MobileMainBurgerWrapper = styled.button(() => {
  const containerHeight: number = 35;
  const lineHeight: number = 2;
  const spacing: number = (containerHeight - lineHeight) / 7;
  const dimention: number = containerHeight - spacing;

  return css`
    position: relative;
    height: ${dimention}px;
    width: ${dimention}px;

    span {
      position: absolute;
      top: 0;
      left: 0;
      width: ${dimention}px;
      height: ${lineHeight}px;
      background-color: transparent;
      transition: transform 0.3s ease-in-out,
                  width 0.3s ease-in-out;

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: ${lineHeight}px;
        background-color: black;
        transition: transform 0.3s ease-in-out;
      }

      &:first-child {
        transform: translateY(${spacing}px);
  
        &::before {
          transform: translateY(-${spacing}px);
        }
  
        &::after {
          transform: translateY(calc(${spacing}px));
        }
      }
  
      &:last-child {
        transform: translateY(${spacing * 5}px);
  
        &::before {
          transform: translateY(-${spacing}px);
        }
  
        &::after {
          transform: translateY(${spacing}px);
        }
      }
    }

    &.opened {

      span {
        width: 43px;

        &:first-child {
          transform: rotate(45deg) translate(5.3px, 14.5px);
    
          &::before {
            transform: translateY(0);
          }
    
          &::after {
            transform: translateY(0);
          }
        }
    
        &:last-child {
          transform: rotate(-45deg) translate(-14.5px, 5.3px);
    
          &::before {
            transform: translateY(0);
          }
    
          &::after {
            transform: translateY(0);
          }
        }
      }
    }
  `}
);