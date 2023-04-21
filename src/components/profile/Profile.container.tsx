import { FC, FormEvent, useCallback, useMemo, useRef, useState } from "react"
import { ProfilePageType } from "../../../pages/profile"
import { InputOnChangeType } from "../input/Input"
import Profile from "./Profile"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "../../types/supabase-types"
import { StatusMessageTypesEnum } from "../FormMessage/FormMessage.container"

export type handleSaveResetType = (event: FormEvent) => void
type ShowFormMessageType = {
  message: string
  type: null | StatusMessageTypesEnum
}

const ProfileContainer: FC<ProfilePageType> = ({ profileData }) => {
  const mountedRef = useRef(true)

  const [fullName, setFullName] = useState(profileData.full_name || '')
  const [username, setUsername] = useState(profileData.username || '')
  const [originalInputs, setOriginalInputs] = useState({
    fullName: profileData.full_name || '',
    username: profileData.username || ''
  })

  const supabaseClient = useSupabaseClient<Database>()

  const [formMessageContent, setFormMessageContent] = useState<ShowFormMessageType>({
    message: '',
    type: null
  })
  const [showFormMessage, setShowMessage] = useState(false)

  const triggerFormMessage = useCallback(({
    message,
    type
  }: ShowFormMessageType) => {
    setFormMessageContent({
      message,
      type
    })

    setShowMessage(true)
  }, [])

  const triggerRemoveFormMessage = useCallback(() => {
    setShowMessage(false)
    setTimeout(() => {
      setFormMessageContent({
        message: '',
        type: null
      })
    }, 300)
  }, [])
  
  const subtitleFormated = useMemo(() => {
    return `Welcome ${originalInputs.username || 'back'}`
  }, [originalInputs])

  const handleFullNameUpdate = useCallback((event: InputOnChangeType) => {
    setFullName(event.currentTarget.value)
    triggerRemoveFormMessage()
  }, [])

  const handleUserNameUpdate = useCallback((event: InputOnChangeType) => {
    setUsername(event.currentTarget.value)
    triggerRemoveFormMessage()
  }, [])

  const handleReset: handleSaveResetType = useCallback((event) => {
    event.preventDefault()

    setFullName(originalInputs.fullName)
    setUsername(originalInputs.username)
  }, [originalInputs])

  const handleSave: handleSaveResetType = useCallback(async event => {
    event.preventDefault()

    const { data: _, error } = await supabaseClient
      .from('profiles')
      .update({
        full_name: fullName,
        username: username
      })
      .eq('id', profileData.id)

      if(!mountedRef) return

    if(!error) {
      setOriginalInputs({
        fullName,
        username
      })

      triggerFormMessage({
        message: 'Your profile has been updated!',
        type: StatusMessageTypesEnum.SUCCESS
      })

    } else if(error.code === '23505') {
      triggerFormMessage({
        message: 'This username already exists',
        type: StatusMessageTypesEnum.ERROR
      })

    } else if(error) {
      triggerFormMessage({
        message: 'Something went wrong. Refresh and try again!',
        type: StatusMessageTypesEnum.ERROR
      })
    }

    return () => {
      mountedRef.current = false
    }
  }, [fullName, username, profileData.id, supabaseClient])

  const hasChangeOccured: boolean = useMemo(() => {
    if(username !== originalInputs.username || fullName !== originalInputs.fullName) {
      return true
    }

    return false
  }, [originalInputs, username, fullName])

  return (
    <Profile
      subtitle={subtitleFormated}
      username={username}
      fullName={fullName}
      handleFullNameUpdate={handleFullNameUpdate}
      handleUserNameUpdate={handleUserNameUpdate}
      handleReset={handleReset}
      handleSave={handleSave}
      hasChangeOccured={hasChangeOccured}
      formMessageProps={{
        type: formMessageContent.type,
        message: formMessageContent.message,
        showMessage: showFormMessage
      }} />
  )
}

export default ProfileContainer