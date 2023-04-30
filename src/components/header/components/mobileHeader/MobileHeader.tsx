import { FC } from "react";
import { NavigationsType } from "../../../../utils/navigation";
import {
  MobileHeaderContainer,
  MobileHeaderStyled,
  PageItem,
  PageList
} from "./MobileHeader.styled";
import { NavLink } from "../../../anchors";
import { NextRouter } from "next/router";

type MobileHeaderType = {
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>
  router: NextRouter
}

const MobileHeader: FC<MobileHeaderType> = ({
  navigationItems,
  handleLogout,
  router
}) => {
  return (
    <MobileHeaderStyled id='mobileMenu'>
      <MobileHeaderContainer>
        <PageList>
          {(navigationItems || []).map(({
            named,
            path
          }) => {
            if(named === 'Logout') {
              return (
                <PageItem key={`MobileHeaderStyled_${named}`}>
                  <NavLink trigger={handleLogout} >
                    { named }
                  </NavLink>
                </PageItem>
              )

            } else {
              return (
                <PageItem key={`MobileHeaderStyled_${named}`}>
                  <NavLink
                    path={path}
                    isActive={router.asPath === path} >
                    { named }
                  </NavLink>
                </PageItem>
              )
            }
          })}
        </PageList>
      </MobileHeaderContainer>
    </MobileHeaderStyled>
  )
}

export default MobileHeader