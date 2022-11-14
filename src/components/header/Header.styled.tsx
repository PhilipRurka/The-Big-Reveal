import styled from 'styled-components'
import { Container } from '../../styled'

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 20px;
  padding-bottom: 20px;
`

export const HeaderMainNavbar = styled.div`
  ${Container('xl')}
  display: flex;
  justify-content: space-between;
  align-items: center;
`