import { useCallback, useEffect } from "react"
import { useAppDispatch } from "../redux/redux_hooks"
import { update_userData } from "../redux/slices/userSlice"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const InitGetSession = () => {
  const dispatch = useAppDispatch()
  const supabaseClient = useSupabaseClient()

  const updateInitialUserData = useCallback(async () => {
    const { data, error } = await supabaseClient.auth.getSession()
  
    if(data?.session) {
      dispatch(update_userData(data.session))
    }
  }, [dispatch, supabaseClient.auth])

  useEffect(() => {
    updateInitialUserData()
  }, [updateInitialUserData])

  return null
}

export default InitGetSession