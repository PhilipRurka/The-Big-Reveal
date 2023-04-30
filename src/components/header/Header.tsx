import { FC } from "react"
import {
  HeaderStyled,
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
    <HeaderStyled>
      <DesktopHeader
        navigationItems={navigationItems}
        handleLogout={handleLogout}
        isXs={isXs} />
      {isXs && (
        <MobileHeader
          navigationItems={navigationItems}
          handleLogout={handleLogout} />
      )}
    </HeaderStyled>
  )
}

export default Header