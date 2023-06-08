import { FC } from "react"
import { BreakObj, Colors } from "../../styled"
import { PageSectionStyled } from "./PageSection.styled"

type PageSectionType = {
  children: JSX.Element | JSX.Element[]
  bgColor: keyof typeof Colors
  size: keyof typeof BreakObj
}

const PageSection: FC<PageSectionType> = ({
  children,
  bgColor,
  size
}) => {
  return (
    <PageSectionStyled
      size={size}
      bgColor={bgColor} >
      { children }
    </PageSectionStyled>
  )
}

export default PageSection