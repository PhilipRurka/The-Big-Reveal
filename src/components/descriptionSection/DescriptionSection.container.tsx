import { FC } from "react"
import DescriptionSection from "./DescriptionSection"

type DescriptionSectionType = {
  children: JSX.Element | JSX.Element[]
}

const DescriptionSectionContainer: FC<DescriptionSectionType> = ({
  children
}) => {
  return (
    <DescriptionSection>{ children }</DescriptionSection>
  )
}

export default DescriptionSectionContainer