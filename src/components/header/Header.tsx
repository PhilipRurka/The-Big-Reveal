import { FC } from "react"
import {
  HeaderWrapper,
} from "./Header.styled"
import { NavigationsType } from "../../utils/navigation"
import {
  DesktopHeader,
  MobileHeader
} from "./components"

export type HeaderType = {
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>
  isXs: boolean | undefined
}

const Header: FC<HeaderType> = ({
  navigationItems,
  handleLogout,
  isXs
}) => {
  return (
    <HeaderWrapper>
      <DesktopHeader
        navigationItems={navigationItems}
        handleLogout={handleLogout}
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