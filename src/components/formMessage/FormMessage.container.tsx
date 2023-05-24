import type { FC } from 'react'
import type { FormMessageIdOptions } from '../../redux/slices/formMessageSlice'

import { useCallback, useEffect, useRef, useState } from 'react'
import FormMessage from './FormMessage'
import gsap from "gsap"
import { AUTH_TRANSITION_TIME } from '../auth/Auth.constant'
import { useAppSelector } from '../../redux/redux_hooks'
import { selectFormMessage } from '../../redux/slices/formMessageSlice'

export enum StatusMessageTypesEnum {
  SUCCESS = 'success',
  ERROR   = 'error'
}

type FormMessageContainerType = {
  id: FormMessageIdOptions
}

const FormMessageContainer: FC<FormMessageContainerType> = ({ id }) => {
  const tlStatusMessageRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))

  const [isCurrentVisible, setIsCurrentVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [currentType, setCurrentType] = useState<null | StatusMessageTypesEnum>(null)
  const {
    type,
    message,
    showMessage,
  } = useAppSelector(selectFormMessage)[id]

  const initGsap = useCallback(() => {
    tlStatusMessageRef.current.fromTo('#status-message-wrapper', {
      height: 0,
    }, {
      duration: AUTH_TRANSITION_TIME / 1000,
      ease: 'power1.out',
      height: 54
    }, 0)
    .fromTo('#status-message', {
      alpha: 0,
    }, {
      duration: AUTH_TRANSITION_TIME / 1000,
      ease: 'power1.out',
      alpha: 1
    }, '>')
  }, [])

  const showUpdatedMessage = useCallback(() => {
    setCurrentMessage(message)
    setCurrentType(type)
    setIsCurrentVisible(true)
  }, [message, type])
  
  const updateVisibleMessage = useCallback(() => {
    setIsCurrentVisible(false)
    setTimeout(() => {
      showUpdatedMessage()
    }, AUTH_TRANSITION_TIME)
  }, [showUpdatedMessage])

  const hideVisibleMessage = useCallback(() => {
    setIsCurrentVisible(false)
    setTimeout(() => {
      setCurrentMessage('')
      setCurrentType(null)
    }, AUTH_TRANSITION_TIME);
  }, [])

  useEffect(() => {
    initGsap()

    let tlStatusMessageScoped = tlStatusMessageRef?.current

    return () => {
      tlStatusMessageScoped?.kill()
    }
  }, [initGsap])

  useEffect(() => {
    if(showMessage) {
      tlStatusMessageRef.current?.play()
      
    } else {
      tlStatusMessageRef.current?.reverse()
    }
  }, [showMessage])

  useEffect(() => {
    if(showMessage && !isCurrentVisible ) {
      showUpdatedMessage()

    } else if(!showMessage && isCurrentVisible) {
      hideVisibleMessage()

    } else if(showMessage && isCurrentVisible && currentMessage !== message) {
      // FRONTEND Is this being used?
      updateVisibleMessage()
    }
  }, [
    showUpdatedMessage,
    hideVisibleMessage,
    updateVisibleMessage,
    showMessage,
    isCurrentVisible,
    currentMessage,
    message
  ])
  
  return (
    <FormMessage
      message={currentMessage}
      type={currentType} />
  )
}

export default FormMessageContainer