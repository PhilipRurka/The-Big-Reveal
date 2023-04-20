import { FC } from "react";
import { BaseSectionWrapper } from "./BaseSection.styled";

type BaseSectionType = {
  children: JSX.Element | JSX.Element[]
}

const BaseSection: FC<BaseSectionType> = ({
  children
}) => {
  return (
    <BaseSectionWrapper>
      { children }
    </BaseSectionWrapper>
  )
}

export default BaseSection