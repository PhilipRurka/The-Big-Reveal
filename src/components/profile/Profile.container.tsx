import { FC, FormEvent, useCallback, useMemo, useRef, useState } from "react"
import { ProfilePageType } from "../../../pages/profile"
import { InputOnChangeType } from "../input/Input"
import Profile from "./Profile"
import { StatusMessageTypesEnum } from "../FormMessage/FormMessage.container"
import axios from "axios"

export type handleSaveResetType = (event: FormEvent) => void
type ShowFormMessageType = {
  message: string
  type: undefined | StatusMessageTypesEnum
}

const ProfileContainer: FC<ProfilePageType> = ({ profileData }) => {
  const mountedRef = useRef(true)

  const [fullName, setFullName] = useState(profileData.full_name || '')
  const [username, setUsername] = useState(profileData.username || '')
  const [originalInputs, setOriginalInputs] = useState({
    fullName: profileData.full_name || '',
    username: profileData.username || ''
  })

  const [formMessageContent, setFormMessageContent] = useState<ShowFormMessageType>({
    message: '',
    type: undefined
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
        type: undefined
      })
    }, 300)
  }, [])
  
  const subtitleFormated = useMemo(() => {
    return `Welcome ${originalInputs.username || 'back'}`
  }, [originalInputs])

  const handleFullNameUpdate = useCallback((event: InputOnChangeType) => {
    setFullName(event.currentTarget.value)
    triggerRemoveFormMessage()
  }, [triggerRemoveFormMessage])

  const handleUserNameUpdate = useCallback((event: InputOnChangeType) => {
    setUsername(event.currentTarget.value)
    triggerRemoveFormMessage()
  }, [triggerRemoveFormMessage])

  const handleReset: handleSaveResetType = useCallback((event) => {
    event.preventDefault()

    setFullName(originalInputs.fullName)
    setUsername(originalInputs.username)
  }, [originalInputs])

  const handleSave: handleSaveResetType = useCallback(async event => {
    event.preventDefault()

    axios.post('/api/profile', {
      fullName,
      username,
    })
    .then(({ data: {
      message
    }
    }) => {
      if(!mountedRef) return
      setOriginalInputs({
        fullName,
        username
      })

      triggerFormMessage({
        message,
        type: StatusMessageTypesEnum.SUCCESS
      })
    })
    .catch(({ response: { data: {
      message
    }}}) => {
      triggerFormMessage({
        message,
        type: StatusMessageTypesEnum.ERROR
      })
    })

    return () => {
      mountedRef.current = false
    }
  }, [fullName, username, triggerFormMessage])

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