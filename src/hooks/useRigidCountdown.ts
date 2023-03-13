import { useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../redux/redux_hooks"
import { selectAuthMessage } from "../redux/slices/authMessageSlice"
import { DefinedStatusMessageStateType } from "../redux/types/authMessageRedux.type"

export const REGISTRATION_ERROR_TIME = 60

type UseRigidCountdowntype = () => {
  initCountdown: () => void
  countdownTimeLeft: number
  resetCooldownTimeLeft: () => void
  resetTimeLeft: (time: number) => void
}

const useRigidCountdown: UseRigidCountdowntype = () => {
  const countdownTimeLeftRef = useRef<ReturnType<typeof setInterval>>()
  const [countdownTimeLeft, setCountdownTimeLeft] = useState<number>(REGISTRATION_ERROR_TIME)
  const authMessage = useAppSelector(selectAuthMessage) as DefinedStatusMessageStateType

  const resetTimeLeft = useCallback((time: number) => {
    countdownTimeLeftRef.current = undefined
    setCountdownTimeLeft(time)
  }, [])

  const updateCountdownTimeLeft = useCallback(() =>  {
    console.log('Hit')
    setCountdownTimeLeft((previous) => (previous - 1))
  }, [])

  const initCountdown = useCallback(() => {
    if(countdownTimeLeftRef.current) return
    countdownTimeLeftRef.current = setInterval(updateCountdownTimeLeft, 1000)
  }, [updateCountdownTimeLeft])

  const resetCooldownTimeLeft = useCallback(() => {
    clearInterval(countdownTimeLeftRef?.current)
  }, [])

  useEffect(() => {
    return () => {
      clearInterval(countdownTimeLeftRef.current)
    }
  }, [])

  useEffect(() => {
    if(authMessage.status !== 429) {
      if(countdownTimeLeft === -1) {
        resetCooldownTimeLeft()
      }
    }
  }, [countdownTimeLeft, resetCooldownTimeLeft, authMessage.status])

  return {
    initCountdown,
    countdownTimeLeft,
    resetCooldownTimeLeft,
    resetTimeLeft
  }
}

export default useRigidCountdown