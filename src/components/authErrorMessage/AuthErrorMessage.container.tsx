import { FC, useCallback, useEffect, useRef } from 'react'
import { AUTH_TRANSITION_TIME } from '../auth/Auth.container'
import { StatusMessageType } from '../auth/Auth.types'
import AuthErrorMessage from './AuthErrorMessage'
import gsap from "gsap"

export type AuthErrorMessageType = {
  statusMessage: StatusMessageType
}

const AuthErrorMessageContainer: FC<AuthErrorMessageType> = ({ statusMessage }) => {
  const tlStatusMessageRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))

  const initGsap = useCallback(() => {
    tlStatusMessageRef.current.fromTo('#status-message-wrapper', {
      height: 0,
      duration: AUTH_TRANSITION_TIME / 1000,
      ease: 'power1.out'
    }, {
      height: 54
    }, 0)
    .fromTo('#status-message', {
      alpha: 0,
      duration: AUTH_TRANSITION_TIME / 1000,
      ease: 'power1.out'
    }, {
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
    if(statusMessage?.showMessage) {
      tlStatusMessageRef.current.play()
      
    } else {
      tlStatusMessageRef.current.reverse()
    }
  }, [statusMessage?.showMessage])
  
  return (
    <AuthErrorMessage statusMessage={statusMessage} />
  )
}

export default AuthErrorMessageContainer