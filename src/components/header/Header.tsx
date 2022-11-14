import { FC } from "react"
import {
  HeaderContainer,
  HeaderWrapper,
} from "./Header.styled"
import {
  DesktopMainNav,
  MobileMainNav,
  GoaldenLogo
} from './components'
import useIsXs from "../../hooks/useIsXs"

const Header: FC = () => {
  const isXs = useIsXs()
  
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <GoaldenLogo />
        {!isXs ? (
          <DesktopMainNav />
        ) : (
          <MobileMainNav />
        )}
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header