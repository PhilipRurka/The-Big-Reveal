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

export type HeaderType = {
  openedBurger: boolean;
  handleUpdateBurger: (openBurger: boolean) => void;
}

const Header: FC<HeaderType> = ({
  openedBurger,
  handleUpdateBurger
}) => {
  const isXs = useIsXs()
  
  return (
    <HeaderWrapper>
      <HeaderMainNavbar>
        <GoaldenLogo />
        {!isXs ? (
          <DesktopMainNav />
        ) : (
          <MobileMainBurger
            openedBurger={openedBurger}
            handleUpdateBurger={handleUpdateBurger} />
        )}
      </HeaderMainNavbar>
      {isXs && (
        <MobileMainNav
          openedBurger={openedBurger} />
      )}
    </HeaderWrapper>
  )
}

export default Header