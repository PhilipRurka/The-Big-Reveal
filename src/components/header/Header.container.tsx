
import { FC, useState } from "react"
import Header from "./Header"

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const HeaderContainer: FC = () => {
  const [openedBurger, setOpenedBurger] = useState<boolean>(false);

  const handleUpdateBurger: handleUpdateBurgerType = (openBurger) => {
    setOpenedBurger(openBurger)
  }
  
  return (
    <Header
      openedBurger={openedBurger}
      handleUpdateBurger={handleUpdateBurger} />
  )
}

export default HeaderContainer