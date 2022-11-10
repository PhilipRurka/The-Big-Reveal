import { FC } from "react"
import { HeaderType } from "./Header.container"
import {
  GoaldenLogo,
  GoaldenLogoWrapper,
  HeaderContainer,
  HeaderWrapper,
  PageList
} from "./Header.styled"

const Header: FC<HeaderType> = ({ componentName }) => {

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <GoaldenLogoWrapper>
          <GoaldenLogo />
        </GoaldenLogoWrapper>
        <PageList>

        </PageList>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header