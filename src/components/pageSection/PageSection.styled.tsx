import styled, { css } from 'styled-components';
import { BreakObj, Colors, Container } from '../../styled';

type PageSectionStyledType = {
  bgColor: keyof typeof Colors
  size: keyof typeof BreakObj
}

export const PageSectionStyled = styled.div<PageSectionStyledType>(({
  bgColor,
  size
}) => css`
  ${Container(size)}
  background-color: ${Colors[bgColor]}
`);