import { FC } from "react"
import {
  AnchorMainWrapper,
  AnchorMainLink,
  AnchorMainTrigger
} from "./Anchors.styled"

type AnchorMainType = {
  name: string;
  path?: string;
  trigger?: (props: any) => Promise<void>
  isActive?: boolean;
}

export const AnchorMain: FC<AnchorMainType> = ({
  name,
  path,
  trigger,
  isActive
}) => {

  return (
    <AnchorMainWrapper isActive={isActive}>
      {path ? (
        <AnchorMainLink
          href={path} >
          {name}
        </AnchorMainLink>
      ) : (
        <AnchorMainTrigger
          onClick={trigger} >
            Logout
        </AnchorMainTrigger>
      )}
    </AnchorMainWrapper>
  )
}