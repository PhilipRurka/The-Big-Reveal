import { useEffect } from "react"
import { useAppDispatch } from "../redux/redux_hooks"
import { update_userData } from "../redux/slices/userSlice"
import { supabase } from "./supabase"

const InitGetSession = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    updateInitialUserData()
  }, [])
  
  const updateInitialUserData = async () => {
    const { data, error } = await supabase.auth.getSession()
  
    if(data?.session) {
      dispatch(update_userData(data.session))
    }
  }

  return null
}

export default InitGetSession