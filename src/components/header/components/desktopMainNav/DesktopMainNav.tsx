import { FC } from 'react';
import { NavigationsType } from "../../../../utils/navigation"
import { NextRouter } from "next/router"
import {
  DesktopMainNavWrapper,
  PageItem,
  PageList
} from './DesktopMainNav.styled';
import { AnchorMain } from '../../../anchors';
import { Session } from '@supabase/supabase-js';

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
        {!!userSession && (
          <PageItem key={`DesktopMainNav_logout`}>
            <AnchorMain
              name='logout'
              trigger={handleLogout} />
          </PageItem>
        )}
        {navigationItems.map(item => (
          <PageItem key={`DesktopMainNav_${item.name}`}>
            <AnchorMain
              name={item.name}
              path={item.path}
              isActive={router.asPath === item.path} />
          </PageItem>
        ))}
      </PageList>
    </DesktopMainNavWrapper>
  );
};

export default DesktopMainNav;