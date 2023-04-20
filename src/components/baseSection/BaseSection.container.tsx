import { FC } from "react"
import BaseSection from "./BaseSection"

type BaseSectionType = {
  children: JSX.Element | JSX.Element[]
}

const BaseSectionContainer: FC<BaseSectionType> = ({
  children
}) => {
  return (
    <BaseSection>{ children }</BaseSection>
  )
}

export default BaseSectionContainer