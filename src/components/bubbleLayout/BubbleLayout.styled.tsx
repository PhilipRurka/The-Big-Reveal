import styled, { css } from 'styled-components';

type BubbleLayoutType = {
  backgroundColor: string
  copyColor: string
}

export const BubbleLayoutWrapper = styled.div<BubbleLayoutType>(({
  copyColor,
  backgroundColor
}) => {
  return css`
    color: ${copyColor};
    background-color: ${backgroundColor};
  `
})