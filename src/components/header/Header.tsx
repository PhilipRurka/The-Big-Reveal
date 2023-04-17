import { FC } from "react"
import {
  HeaderMainNavbar,
  HeaderWrapper,
} from "./Header.styled"
import {
  DesktopMainNav,
  MobileMainNav,
  GoaldenLogo,
  MobileMainBurger
} from './components'
import { MobileMainBurgerType } from "./components/mobileMainBurger/MobileMainBurger.container"
import { NavigationsType } from "../../utils/navigation"
import DesktopHeader from "./components/desktopHeader/DesktopHeader.container"

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
}) => {
  return (
    <HeaderWrapper>
      {!isXs ? (
        <DesktopHeader
          navigationItems={navigationItems}
          handleLogout={handleLogout} />
      ) : (
        <MobileHeader
          navigationItems={navigationItems}
          openedBurger={openedBurger}
          handleUpdateBurger={handleUpdateBurger}
          handleLogout={handleLogout} />
      )}
    </HeaderWrapper>
  )
}

export default Header