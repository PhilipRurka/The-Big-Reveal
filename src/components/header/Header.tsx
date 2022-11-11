import { FC, useEffect, useRef } from "react"
import {
  GoaldenLogo,
  GoaldenLogoAnchor,
  GoaldenLogoWrapper,
  HeaderContainer,
  HeaderWrapper,
  PageItem,
  PageItemAnchor,
  PageList
} from "./Header.styled"
import goaldenLogo from '../../../public/assets/Philip_Rurka_Logo.png'
import { mainNavigation } from "../../lib/navigation"
import { useRouter } from "next/router"

const Header: FC = () => {
  const goaldenLogoRef = useRef<HTMLAnchorElement>()
  const router = useRouter()

  useEffect(() =>  {
    goaldenLogoRef.current?.focus()
  }, [router])
  
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <GoaldenLogoWrapper>
          <GoaldenLogoAnchor
            ref={goaldenLogoRef as any}
            href='/'
            aria-label='Home page' >
            <GoaldenLogo
              src={goaldenLogo}
              alt='Goalden\s logo' />
            </GoaldenLogoAnchor>
        </GoaldenLogoWrapper>
        <PageList>
          {mainNavigation.map(({
            name,
            path
          }) => (
            <PageItem key={'navigation'}>
              <PageItemAnchor
                href={path}
                isActive={router.asPath === path} >
                {name}
              </PageItemAnchor>
            </PageItem>
          ))}
        </PageList>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header