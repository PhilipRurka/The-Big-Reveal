import {
  NavLinkStyled,
  NavLinkAnchor,
  NavLinkButton
} from "./Anchors.styled"

import type { FC } from "react"
import type { NavLinkProps } from "./Anchor.type"

export const NavLink: FC<NavLinkProps> = ({
  children,
  path,
  trigger,
  isActive
}) => {

  return (
    <NavLinkStyled>
      {path ? (
        <NavLinkAnchor
          href={path}
          $isActive={isActive} >
          {children}
        </NavLinkAnchor>
      ) : (
        <NavLinkButton
          onClick={trigger}
          $isActive={isActive} >
          {children}
        </NavLinkButton>
      )}
    </NavLinkStyled>
  )
}