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
import MobileMainBurger from "./components/mobileMainBurger"
import { MobileMainBurgerType } from "./components/mobileMainBurger/MobileMainBurger.container"
import { NavigationsType } from "../../utils/navigation"

export type HeaderType = MobileMainBurgerType & {
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>
  isXs: boolean | undefined
}

const Header: FC<HeaderType> = ({
  openedBurger,
  handleUpdateBurger,
  navigationItems,
  handleLogout,
  isXs
}) => (
  <HeaderWrapper>
    <HeaderMainNavbar>
      <GoaldenLogo />
      {!isXs ? (
        <DesktopMainNav
          navigationItems={navigationItems}
          handleLogout={handleLogout} />
      ) : (
        <MobileMainBurger
          openedBurger={openedBurger}
          handleUpdateBurger={handleUpdateBurger} />
      )}
    </HeaderMainNavbar>
    {isXs && (
      <MobileMainNav
        openedBurger={openedBurger}
        navigationItems={navigationItems}
        handleLogout={handleLogout} />
    )}
  </HeaderWrapper>
)

export default Header