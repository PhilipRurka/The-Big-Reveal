import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Profile from "./Profile"
import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container"
import axios from "axios"

import type { FC } from 'react'
import type {
  HandleSaveReset,
  ProfileContainerProps,
  ShowFormMessageType
} from './Profile.type'
import type { InputOnChange } from "../input/Input.type"

const ProfileContainer: FC<ProfileContainerProps> = ({ profileData }) => {
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

  const handleFullNameUpdate = useCallback((event: InputOnChange) => {
    setFullName(event.currentTarget.value)
    triggerRemoveFormMessage()
  }, [triggerRemoveFormMessage])

  const handleUserNameUpdate = useCallback((event: InputOnChange) => {
    setUsername(event.currentTarget.value)
    triggerRemoveFormMessage()
  }, [triggerRemoveFormMessage])

  const handleReset: HandleSaveReset = useCallback((event) => {
    event.preventDefault()

    setFullName(originalInputs.fullName)
    setUsername(originalInputs.username)
  }, [originalInputs])

  const handleSave: HandleSaveReset = useCallback(async event => {
    event.preventDefault()

    axios.post('/api/profile', {
      full_name: fullName,
      username
    })
    .then(({ data: { message }}) => {
      if(!mountedRef.current) return
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
  }, [fullName, username, triggerFormMessage])

  const hasChangeOccured: boolean = useMemo(() => {
    if(username !== originalInputs.username || fullName !== originalInputs.fullName) {
      return true
    }

    return false
  }, [originalInputs, username, fullName])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

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