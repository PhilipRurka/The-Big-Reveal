import { FC } from "react"
import {
  HeaderMainNavbar,
  HeaderWrapper,
} from "./Header.styled"
import {
  DesktopMainNav,
  MobileMainNav,
  GoaldenLogo
} from './components'
import useIsXs from "../../hooks/useIsXs"
import MobileMainBurger from "./components/mobileMainBurger"
import { MobileMainBurgerType } from "./components/mobileMainBurger/MobileMainBurger.container"

export type HeaderType = MobileMainBurgerType & {
  hasUser: boolean;
}

const Header: FC<HeaderType> = ({
  openedBurger,
  handleUpdateBurger,
  hasUser
}) => {
  const isXs = useIsXs()
  
  return (
    <HeaderWrapper>
      <HeaderMainNavbar>
        <GoaldenLogo />
        {!isXs ? (
          <DesktopMainNav hasUser={hasUser} />
        ) : (
          <MobileMainBurger
            openedBurger={openedBurger}
            handleUpdateBurger={handleUpdateBurger} />
        )}
      </HeaderMainNavbar>
      {isXs && (
        <MobileMainNav
          openedBurger={openedBurger}
          hasUser={hasUser} />
      )}
    </HeaderWrapper>
  )
}

export default Header