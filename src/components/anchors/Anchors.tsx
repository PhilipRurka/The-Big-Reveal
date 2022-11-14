import { FC } from "react"
import { AnchorMainWrapper } from "./Anchors.styled"

type AnchorMainType = {
  path: string;
  name: string;
  isActive: boolean;
}

export const AnchorMain: FC<AnchorMainType> = ({
  path,
  name,
  isActive
}) => {
  return (
    <AnchorMainWrapper
      href={path}
      isActive={isActive} >
      {name}
    </AnchorMainWrapper>
  )
}