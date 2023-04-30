import { FC } from "react"
import {
  NavLinkStyled,
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