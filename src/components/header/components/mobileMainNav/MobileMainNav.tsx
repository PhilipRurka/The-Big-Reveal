import { AnchorMain } from '../../../anchors';
import React, { FC } from 'react';
import {
  MobileMainNavWrapper,
  MobileMainNavContainer,
  PageItem,
  PageList
} from './MobileMainNav.styled';
import { NavigationsType } from '../../../../utils/navigation';
import type { Session } from '@supabase/supabase-js';
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
            <AnchorMain
              path={path}
              name={name}
              isActive={router.asPath === path} />
          </PageItem>
        ))}
        {!!userSession && (
          <PageItem key={`DesktopMainNav_logout`}>
            <AnchorMain
              name='logout'
              trigger={handleLogout} />
          </PageItem>
        )}
      </PageList>
    </MobileMainNavContainer>
  </MobileMainNavWrapper>
);

export default MobileMainNav;