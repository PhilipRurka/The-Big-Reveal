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
import { NavLinkFormButton } from '../../../anchors/Anchors.styled';

type DesktopMainNavType = {
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
  router: NextRouter
  userSession: Session | null
}

const DesktopMainNav: FC<DesktopMainNavType> = ({
  navigationItems,
  handleLogout,
  router,
  userSession
}) => {

  return (
    <DesktopMainNavWrapper>
      <PageList>
        <PageItem key={`DesktopMainNav_new_entry`}>
          {!!userSession && (
            <NavLinkFormButton
              href='/new-post'
              $isActive={router.asPath === '/new-post'} >
              New
            </NavLinkFormButton>
          )}
        </PageItem>
        {navigationItems.map(item => (
          <PageItem key={`DesktopMainNav_${item.name}`}>
            <NavLink
              path={item.path}
              isActive={router.asPath === item.path} >
              {item.name}
            </NavLink>
          </PageItem>
        ))}
        {!!userSession && (
          <PageItem key={`DesktopMainNav_logout`}>
            <NavLink trigger={handleLogout} >
              Logout
            </NavLink>
          </PageItem>
        )}
      </PageList>
    </DesktopMainNavWrapper>
  );
};

export default DesktopMainNav;