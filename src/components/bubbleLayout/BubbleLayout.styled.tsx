import styled, { css } from 'styled-components';
import { Colors } from '../../styled';

type BubbleLayoutType = {

}

export const BubbleLayoutStyled = styled.div<BubbleLayoutType>`
  box-shadow: 0 0 15px -3px black;
  padding: 30px var(--bubble-layout-side-padding);
  border-radius: 15px;
`