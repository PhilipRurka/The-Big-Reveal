import { FC } from "react";
import { DescriptionSectionWrapper } from "./DescriptionSection.styled";

type DescriptionSectionType = {
  children: JSX.Element | JSX.Element[]
}

const DescriptionSection: FC<DescriptionSectionType> = ({
  children
}) => {
  return (
    <DescriptionSectionWrapper>
      { children }
    </DescriptionSectionWrapper>
  )
}

export default DescriptionSection