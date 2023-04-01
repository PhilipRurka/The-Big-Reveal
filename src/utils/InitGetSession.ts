import { useCallback, useEffect } from "react"
import { useAppDispatch } from "../redux/redux_hooks"
import { update_userData } from "../redux/slices/userSlice"
import { supabase } from "./supabase"

const InitGetSession = () => {
  const dispatch = useAppDispatch()

  const updateInitialUserData = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession()

    // debugger
  
    if(data?.session) {
      dispatch(update_userData(data.session))

    } else {
      dispatch(update_userData(null))
    }
  }, [dispatch])

  useEffect(() => {
    updateInitialUserData()
  }, [updateInitialUserData])

  return null
}

export default InitGetSession