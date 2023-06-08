import type { FC } from "react"

import styled from "styled-components"
// import { Container } from "../../styled"
import { BrandLogo } from "./components"
import { DesktopHeaderStyled } from "./components/desktopHeader/DesktopHeader.styled"

const HeaderTempStyled = styled(DesktopHeaderStyled)`
  padding-top: 20px;
  padding-bottom: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const HeaderTemp: FC = () => {
  return (
    <HeaderTempStyled>
      <BrandLogo />
    </HeaderTempStyled>
  )
}

export default HeaderTemp