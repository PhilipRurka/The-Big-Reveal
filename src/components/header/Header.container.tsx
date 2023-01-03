import { FC, useEffect, useMemo, useState } from "react"
import Header from "./Header"
import { navWithAuth, navWithoutAuth } from '../../utils/navigation';
import { useAppDispatch } from "../../redux/redux_hooks";
import { remove_userData, selectUserData, update_userData } from "../../redux/slices/userSlice";
import { useAppSelector } from '../../redux/redux_hooks';
import { supabase } from "../../utils/supabase";
import useIsXs from "../../hooks/useIsXs";

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const HeaderContainer: FC = () => {
  const [openedBurger, setOpenedBurger] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const { session: userSession } = useAppSelector(selectUserData)
  const isXs = useIsXs()

  const handleUpdateBurger: handleUpdateBurgerType = (openBurger) => {
    setOpenedBurger(openBurger)
  }

  const updateInitialUserData = async () => {
    const { data, error } = await supabase.auth.getSession()

    if(data?.session) {
      dispatch(update_userData(data.session))
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    dispatch(remove_userData())
  }

  useEffect(() => {
    updateInitialUserData()
  }, [])

  const navigationItems = useMemo(() => (
    userSession ? navWithAuth : navWithoutAuth
  ), [userSession])
  
  return (
    <Header
      openedBurger={openedBurger}
      handleUpdateBurger={handleUpdateBurger}
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      isXs={isXs} />
  )
}

export default HeaderContainer