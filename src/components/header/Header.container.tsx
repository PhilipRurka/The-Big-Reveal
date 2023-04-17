import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FC, useMemo } from "react"
import Header from "./Header"
import { navWithAuth, navWithoutAuth } from '../../utils/navigation';
import { useAppDispatch } from "../../redux/redux_hooks";
import { remove_userData, selectUser } from "../../redux/slices/userSlice";
import { useAppSelector } from '../../redux/redux_hooks';
import useIsXs from "../../hooks/useIsXs";
import { useRouter } from 'next/router';

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const HeaderContainer: FC = () => {
  const dispatch = useAppDispatch()
  const {
    session: userSession,
    status: getUserStatus
  } = useAppSelector(selectUser)
  const isXs = useIsXs()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabaseClient.auth.signOut()
    dispatch(remove_userData(router))
  }

  const navigationItems = useMemo(() => {
    if(getUserStatus === "succeeded" && userSession) {
      return navWithAuth
      
    } else {
      return navWithoutAuth
    }
  }, [userSession, getUserStatus])
  
  return (
    <Header
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      isXs={isXs} />
  )
}

export default HeaderContainer