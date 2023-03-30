import { useCallback, useEffect, useRef, useState } from "react"

export const REGISTRATION_ERROR_TIME = 60

type UseRigidCountdowntype = () => {
  initCountdown: (timeLeft: number) => void
  countdownTimeLeft: number | null
  resetCooldownTimeLeft: () => void
}

const UseRigidCountdown: UseRigidCountdowntype = () => {
  let countdownTimeLeftRef = useRef<ReturnType<typeof setInterval>>()
  const [countdownTimeLeft, setCountdownTimeLeft] = useState<number | null>(null)

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

  return {
    initCountdown,
    countdownTimeLeft,
    resetCooldownTimeLeft
  }
}

export default UseRigidCountdown