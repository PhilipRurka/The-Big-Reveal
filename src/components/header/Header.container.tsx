import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FC, useEffect, useMemo, useState } from "react"
import Header from "./Header"
import { navWithAuth, navWithoutAuth } from '../../utils/navigation';
import { useAppDispatch } from "../../redux/redux_hooks";
import { remove_userData } from "../../redux/slices/userSlice";
import useIsXs from "../../hooks/useIsXs";
import { useRouter } from 'next/router';
import { getCookie } from '../../utils/cookies';

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const HeaderContainer: FC = () => {
  const dispatch = useAppDispatch()
  const isXs = useIsXs()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const [hasSessionToken, setHasSessionToken] = useState<boolean>(false)

  useEffect(() => {
    console.log(!!getCookie('supabase-auth-token'))
    setHasSessionToken(!!getCookie('supabase-auth-token'))
  }, [])

  const handleLogout = async () => {
    await supabaseClient.auth.signOut()
    dispatch(remove_userData(router))
  }

  const navigationItems = useMemo(() => {
    return hasSessionToken ? navWithAuth : navWithoutAuth
  }, [hasSessionToken])
  
  return (
    <Header
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      isXs={isXs} />
  )
}

export default HeaderContainer