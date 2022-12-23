import { FC, useMemo, useState } from "react"
import Header from "./Header"
import { navWithAuth, navWithoutAuth } from '../../utils/navigation';

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const user = false

const HeaderContainer: FC = () => {
  const [openedBurger, setOpenedBurger] = useState<boolean>(false);

  const handleUpdateBurger: handleUpdateBurgerType = (openBurger) => {
    setOpenedBurger(openBurger)
  }

  const navigationItems = useMemo(() => {
    if(!!user) {
      return navWithAuth

    } else {
      return navWithoutAuth
    }
  }, [!!user])
  
  return (
    <Header
      openedBurger={openedBurger}
      handleUpdateBurger={handleUpdateBurger}
      navigationItems={navigationItems} />
  )
}

export default HeaderContainer