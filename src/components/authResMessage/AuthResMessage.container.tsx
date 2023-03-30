import { useCallback, useEffect, useRef } from 'react'
import { AUTH_TRANSITION_TIME } from '../auth/Auth.container'
import AuthResMessage from './AuthResMessage'
import gsap from "gsap"
import { useAppSelector } from '../../redux/redux_hooks'
import { selectAuthMessage } from '../../redux/slices/authMessageSlice'
import { DefinedStatusMessageStateType } from '../../redux/types/authMessageRedux.type'

const AuthResMessageContainer = () => {
  const tlStatusMessageRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))
  const authMessage = useAppSelector(selectAuthMessage) as DefinedStatusMessageStateType

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
    if(authMessage?.showMessage) {
      tlStatusMessageRef.current.play()
      
    } else {
      tlStatusMessageRef.current.reverse()
    }
  }, [authMessage?.showMessage])
  
  return (
    <AuthResMessage
      message={authMessage?.formattedMessage}
      type={authMessage?.type} />
  )
}

export default AuthResMessageContainer