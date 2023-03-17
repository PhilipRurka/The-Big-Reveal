import { useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../redux/redux_hooks"
import { selectAuthMessage } from "../redux/slices/authMessageSlice"
import { DefinedStatusMessageStateType } from "../redux/types/authMessageRedux.type"

export const REGISTRATION_ERROR_TIME = 60

type UseRigidCountdowntype = () => {
  initCountdown: (timeLeft: number) => void
  countdownTimeLeft: number | null
  resetCooldownTimeLeft: () => void
}

const useRigidCountdown: UseRigidCountdowntype = () => {
  let countdownTimeLeftRef = useRef<ReturnType<typeof setInterval>>()
  const [countdownTimeLeft, setCountdownTimeLeft] = useState<number | null>(null)
  const authMessage = useAppSelector(selectAuthMessage) as DefinedStatusMessageStateType

  // const resetTimeLeft = useCallback((time: number) => {
  //   countdownTimeLeftRef.current = undefined
  //   setCountdownTimeLeft(time)
  // }, [])

  const updateCountdownTimeLeft = useCallback(() =>  {
    setCountdownTimeLeft((previous) => (typeof previous === 'number' ? previous - 1 : null))
  }, [])

  const initCountdown = useCallback((timeLeft: number) => {
    if(countdownTimeLeftRef.current) return
    setCountdownTimeLeft(timeLeft)

    countdownTimeLeftRef.current = setInterval(() => updateCountdownTimeLeft(), 1000)
  }, [updateCountdownTimeLeft])

  const resetCooldownTimeLeft = useCallback(() => {
    clearInterval(countdownTimeLeftRef.current)
    
    countdownTimeLeftRef.current = undefined

    setCountdownTimeLeft(null)
  }, [])

  useEffect(() => {
    return () => {
      clearInterval(countdownTimeLeftRef?.current)
    }
  }, [])

  useEffect(() => {
    console.log({
      message: 'countdownTimeLeft',
      value: countdownTimeLeft
    })
    if(authMessage.status === 429) {
      if(countdownTimeLeft === -1) {
        resetCooldownTimeLeft()
      }
    }
  }, [countdownTimeLeft, resetCooldownTimeLeft, authMessage.status])

  return {
    initCountdown,
    countdownTimeLeft,
    resetCooldownTimeLeft
  }
}

export default useRigidCountdown