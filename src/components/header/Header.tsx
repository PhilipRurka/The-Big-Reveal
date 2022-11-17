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
import { NavigationsType } from "../../utils/navigation"

export type HeaderType = MobileMainBurgerType & {
  navigationItems: NavigationsType;
}

const Header: FC<HeaderType> = ({
  openedBurger,
  handleUpdateBurger,
  navigationItems
}) => {
  const isXs = useIsXs()
  
  return (
    <HeaderWrapper>
      <HeaderMainNavbar>
        <GoaldenLogo />
        {!isXs ? (
          <DesktopMainNav navigationItems={navigationItems} />
        ) : (
          <MobileMainBurger
            openedBurger={openedBurger}
            handleUpdateBurger={handleUpdateBurger} />
        )}
      </HeaderMainNavbar>
      {isXs && (
        <MobileMainNav
          openedBurger={openedBurger}
          navigationItems={navigationItems} />
      )}
    </HeaderWrapper>
  )
}

export default Header