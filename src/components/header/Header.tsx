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
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"

export type HeaderType = MobileMainBurgerType & {
  navigationItems: NavigationsType;
}

const Header: FC<HeaderType> = ({
  openedBurger,
  handleUpdateBurger,
  navigationItems
}) => {
  const isXs = useIsXs()
  const supabase = useSupabaseClient()
  const session = useSession()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }
  
  return (
    <HeaderWrapper>
      <HeaderMainNavbar>
        <GoaldenLogo />
        {!isXs ? (
          <DesktopMainNav
            navigationItems={navigationItems}
            handleLogout={handleLogout}
            session={session} />
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
          handleLogout={handleLogout}
          session={session} />
      )}
    </HeaderWrapper>
  )
}

export default Header