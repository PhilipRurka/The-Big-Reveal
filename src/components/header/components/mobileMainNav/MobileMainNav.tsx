import { NavLink } from '../../../anchors';
import React, { FC } from 'react';
import {
  MobileMainNavWrapper,
  MobileMainNavContainer,
  PageItem,
  PageList
} from './MobileMainNav.styled';
import { NavigationsType } from '../../../../utils/navigation';
import type { Session } from '@supabase/auth-helpers-react'
import { NextRouter } from 'next/router';

type MobileMainNavType = {
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>
  router: NextRouter
  userSession: Session | null
}

const MobileMainNav: FC<MobileMainNavType> = ({
  navigationItems,
  handleLogout,
  router,
  userSession
}) => (
  <MobileMainNavWrapper id='mobileMenu'>
    <MobileMainNavContainer>

      <PageList>
        {(navigationItems || []).map(({
          name,
          path
        }) => (
          <PageItem key={`MobileMainNavWrapper_${name}`}>
            <NavLink
              path={path}
              isActive={router.asPath === path} >
              name
            </NavLink>
          </PageItem>
        ))}
        {!!userSession && (
          <PageItem key={`DesktopMainNav_logout`}>
            <NavLink trigger={handleLogout} >
              logout
            </NavLink>
          </PageItem>
        )}
      </PageList>
    </MobileMainNavContainer>
  </MobileMainNavWrapper>
);

export default MobileMainNav;