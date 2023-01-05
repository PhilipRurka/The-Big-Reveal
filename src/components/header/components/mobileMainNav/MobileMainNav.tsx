import React, { FC } from 'react';
import { AnchorMain } from '../../../anchors';
import {
  MobileMainNavWrapper,
  PageItem,
  PageList
} from './MobileMainNav.styled';
import { NavigationsType } from '../../../../utils/navigation';
import { Session } from '@supabase/supabase-js';
import { NextRouter } from 'next/router';

type MobileMainNavType = {
  openedBurger: boolean;
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>
  router: NextRouter
  userSession: Session | null
}

const MobileMainNav: FC<MobileMainNavType> = ({
  openedBurger,
  navigationItems,
  handleLogout,
  router,
  userSession
}) => (
  <MobileMainNavWrapper openedBurger={openedBurger}>
    <PageList>
      {!!userSession && (
        <PageItem key={`DesktopMainNav_logout`}>
          <AnchorMain
            name='logout'
            trigger={handleLogout} />
        </PageItem>
      )}
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
    </PageList>
  </MobileMainNavWrapper>
);

export default MobileMainNav;