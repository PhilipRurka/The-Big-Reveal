import { FC, useCallback, useEffect, useRef } from 'react'
import { AUTH_TRANSITION_TIME } from '../auth/Auth.container'
import FormMessage from './FormMessage'
import gsap from "gsap"

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
  const tlStatusMessageRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))

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

  useEffect(() => {
    initGsap()

    let tlStatusMessageScoped = tlStatusMessageRef?.current

    return () => {
      tlStatusMessageScoped?.kill()
    }
  }, [initGsap])

  useEffect(() => {
    if(showMessage) {
      tlStatusMessageRef.current.play()
      
    } else {
      tlStatusMessageRef.current.reverse()
    }
  }, [showMessage])
  
  return (
    <FormMessage
      message={message}
      type={type} />
  )
}

export default FormMessageContainer