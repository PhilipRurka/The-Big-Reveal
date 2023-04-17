import styled from 'styled-components'
import { Container } from '../../../../styled'

export const MobileHeaderWrapper = styled.div`
  height: 0;
  background-color: white;
  overflow: hidden;
`

export const MobileHeaderContainer = styled.div`
  ${Container('xl')}
  padding-top: 30px;
  padding-bottom: 20px;
`;

export const PageList = styled.ul`

`

export const PageItem = styled.li`
  margin-bottom: 20px;

  &:last-child {
    margin: 0;
  }
`
