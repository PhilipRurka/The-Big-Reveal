import styled from 'styled-components'
import { Container } from '../../../../styled'

export const MobileMainNavWrapper = styled.div`
  background-color: white;
  overflow: hidden;
`

export const MobileMainNavContainer = styled.div`
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
