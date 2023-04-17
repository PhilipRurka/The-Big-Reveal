import { FC } from 'react';
import { NavigationsType } from "../../../../utils/navigation"
import { NextRouter } from "next/router"
import {
  DesktopMainNavWrapper,
  PageItem,
  PageList
} from './DesktopMainNav.styled';
import { NavLink } from '../../../anchors';
import type { Session } from '@supabase/auth-helpers-react'
import { NewPostButton } from '../../../anchors/Anchors.styled';

type DesktopMainNavType = {
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
  router: NextRouter
  userSession: Session | null
}

const DesktopMainNav: FC<DesktopMainNavType> = ({
  navigationItems,
  handleLogout,
  router
}) => {

  return (
    <DesktopMainNavWrapper>
      <PageList>
        {navigationItems.map(({
          named,
          path
        }) => {
          const key = `DesktopHeader_${named}`

          if(path === '/new-post') {
            return (
              <PageItem key={key}>
                <NewPostButton
                  href={path}
                  $isActive={router.asPath === path} >
                  { named }
                </NewPostButton>
              </PageItem>
            )

          } else if(named === 'Logout') {
            return (
              <PageItem key={key}>
                <NavLink trigger={handleLogout} >
                { named }
                </NavLink>
              </PageItem>
            )

          } else {
            return (
              <PageItem key={key}>
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
    </DesktopMainNavWrapper>
  );
};

export default DesktopMainNav;