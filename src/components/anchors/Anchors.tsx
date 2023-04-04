import { FC } from "react"
import {
  NavLinkWrapper,
  NavLinkAnchor,
  NavLinkButton
} from "./Anchors.styled"

type NavLinkType = {
  children: string;
  path?: string;
  trigger?: (props: any) => Promise<void>
  isActive?: boolean;
}

export const NavLink: FC<NavLinkType> = ({
  children,
  path,
  trigger,
  isActive
}) => {

  return (
    <NavLinkWrapper>
      {path ? (
        <NavLinkAnchor
          href={path}
          isActive={isActive} >
          {children}
        </NavLinkAnchor>
      ) : (
        <NavLinkButton
          onClick={trigger}
          isActive={isActive} >
          {children}
        </NavLinkButton>
      )}
    </NavLinkWrapper>
  )
}