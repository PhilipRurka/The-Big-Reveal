import styled from 'styled-components'
import { Container } from '../../../../styled'

type MobileMainNavWrapperType = {
  openedBurger: boolean
}

export const MobileMainNavWrapper = styled.div<MobileMainNavWrapperType>`
  ${Container('xl')}
  display: ${props => props.openedBurger ? 'block' : 'none'};
  background-color: white;
  padding-top: 30px;
  padding-bottom: 20px;
`

export const PageList = styled.ul`

`

export const PageItem = styled.li`
  margin-bottom: 20px;

  &:last-child {
    margin: 0;
  }
`
