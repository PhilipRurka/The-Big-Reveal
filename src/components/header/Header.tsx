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
import { createClient } from "@supabase/supabase-js"
import { useAppDispatch } from "../../redux/redux_hooks"
import { remove_userData } from "../../redux/slices/userSlice"

export type HeaderType = MobileMainBurgerType & {
  navigationItems: NavigationsType;
}

const Header: FC<HeaderType> = ({
  openedBurger,
  handleUpdateBurger,
  navigationItems
}) => {
  const isXs = useIsXs()
  const dispatch = useAppDispatch()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    dispatch(remove_userData())
  }
  
  return (
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
          handleLogout={handleLogout}
          session={true} />
      )}
    </HeaderWrapper>
  )
}

export default Header