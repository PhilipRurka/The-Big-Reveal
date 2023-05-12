import { useCallback, useEffect, useRef } from 'react'
import FormMessage from './FormMessage'
import gsap from "gsap"
import { AUTH_TRANSITION_TIME } from '../auth/Auth.constant'

import type { FC } from 'react'

export enum StatusMessageTypesEnum {
  SUCCESS = 'success',
  ERROR   = 'error'
}

export type FormMessageContainerType = {
  type: undefined | StatusMessageTypesEnum
  message: string
  showMessage: boolean
}

const FormMessageContainer: FC<FormMessageContainerType> = ({
  showMessage,
  message,
  type
}) => {
  const tlStatusMessageRef = useRef<gsap.core.Timeline>()

  const initGsap = useCallback(() => {
    return gsap.timeline().fromTo('#status-message-wrapper', {
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

  useEffect(() => {
    tlStatusMessageRef.current = initGsap()

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
  
  return (
    <FormMessage
      message={message}
      type={type} />
  )
}

export default FormMessageContainer