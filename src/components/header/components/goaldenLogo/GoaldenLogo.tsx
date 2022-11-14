import { useRouter } from "next/router"
import { FC, useEffect, useRef } from "react"
import goaldenLogo from '../../../../../public/assets/Philip_Rurka_Logo.png'
import {
  GoaldenImg,
  GoaldenLogoAnchor,
  GoaldenLogoWrapper
} from "./GoaldenLogo.styled"

const GoaldenLogo: FC = () => {
  const goaldenLogoRef = useRef<HTMLAnchorElement>()
  const router = useRouter()

  useEffect(() =>  {
    goaldenLogoRef.current?.focus()
  }, [router])

  return (
    <GoaldenLogoWrapper>
      <GoaldenLogoAnchor
        ref={goaldenLogoRef as any}
        href='/'
        aria-label='Home page' >
        <GoaldenImg
          src={goaldenLogo}
          alt='Goalden\s logo' />
      </GoaldenLogoAnchor>
    </GoaldenLogoWrapper>
  )
}

export default GoaldenLogo