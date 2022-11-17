
import { useUser } from "@auth0/nextjs-auth0";
import { FC, useMemo, useState } from "react"
import Header from "./Header"
import { navWithAuth, navWithoutAuth } from '../../utils/navigation';

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const HeaderContainer: FC = () => {
  const [openedBurger, setOpenedBurger] = useState<boolean>(false);
  const { user, error, isLoading } = useUser();

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  return (
    <Header
      openedBurger={openedBurger}
      handleUpdateBurger={handleUpdateBurger}
      navigationItems={navigationItems} />
  )
}

export default HeaderContainer