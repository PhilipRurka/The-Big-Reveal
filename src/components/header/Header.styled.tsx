import styled from 'styled-components'
import { default as ImageNext } from 'next/image'
import { default as LinkNext } from 'next/link'
import { Colors, Container } from '../../styled'

type PageItemAnchorType = {
  isActive: boolean
}

export const HeaderWrapper = styled.header`
  ${Container('xl')}
  padding-top: 20px;
  padding-bottom: 20px;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const GoaldenLogoWrapper = styled.div``

export const GoaldenLogoAnchor = styled(LinkNext)``

export const GoaldenLogo = styled(ImageNext)`
  height: 30px;
  width: 30px;
  object-fit: contain;
`

export const PageList = styled.ul``

export const PageItem = styled.li`
  
`;

export const PageItemAnchor = styled(({
  isActive,
  ...props
}) => (
  <LinkNext {...props} />
))<PageItemAnchorType>`
  color: ${props => props.isActive ? Colors.eucalyptus : 'initial'};

  &:hover {
    color: ${Colors.persimmon};
  }

  &:active {
    color: ${Colors.dodger};
  }
`;