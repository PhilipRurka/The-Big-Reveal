import { FC, useEffect, useState } from "react"
import Header from "./Header"
import { navWithAuth, navWithoutAuth } from '../../utils/navigation';
import { useAppDispatch } from "../../redux/redux_hooks";
import { selectUserData, update_userData } from "../../redux/slices/userSlice";
import { useAppSelector } from '../../redux/redux_hooks';
import { supabase } from "../../utils/supabase";

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const HeaderContainer: FC = () => {
  const [openedBurger, setOpenedBurger] = useState<boolean>(false);
  const updateUserDispatch = useAppDispatch()
  const { session: userSession } = useAppSelector(selectUserData)

  const handleUpdateBurger: handleUpdateBurgerType = (openBurger) => {
    setOpenedBurger(openBurger)
  }

  const updateInitialUserData = async () => {
    const { data, error } = await supabase.auth.getSession()

    if(data?.session) {
      updateUserDispatch(update_userData(data.session))
    }
  }

  useEffect(() => {
    updateInitialUserData()
  }, [])
  
  return (
    <Header
      openedBurger={openedBurger}
      handleUpdateBurger={handleUpdateBurger}
      navigationItems={userSession ? navWithAuth : navWithoutAuth} />
  )
}

export default HeaderContainer