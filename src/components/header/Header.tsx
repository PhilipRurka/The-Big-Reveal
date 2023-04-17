import { FC } from "react"
import {
  HeaderWrapper,
} from "./Header.styled"
import { MobileBurgerType } from "./components/mobileBurger/MobileBurger.container"
import { NavigationsType } from "../../utils/navigation"
import {
  DesktopHeader,
  MobileHeader
} from "./components"

export type HeaderType = MobileBurgerType & {
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
      <DesktopHeader
        navigationItems={navigationItems}
        handleLogout={handleLogout}
        openedBurger={openedBurger}
        handleUpdateBurger={handleUpdateBurger}
        isXs={isXs} />
      {isXs && (
        <MobileHeader
          navigationItems={navigationItems}
          handleLogout={handleLogout} />
      )}
    </HeaderWrapper>
  )
}

export default Header