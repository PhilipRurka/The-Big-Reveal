import { FC } from 'react';
import { NavigationsType, navWithoutAuth } from "../../../../utils/navigation"
import { useRouter } from "next/router"
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
  session: Session | null
}

const DesktopMainNav: FC<DesktopMainNavType> = ({
  navigationItems,
  handleLogout,
  session
}) => {
  const router = useRouter()

  return (
    <DesktopMainNavWrapper>
      <PageList>
        {session && (
          <PageItem key={`DesktopMainNav_logout`}>
            <AnchorMain
              name='logout'
              trigger={handleLogout} />
          </PageItem>
        )}
        {navigationItems.map(item => (
          <>
            {item.path === '/login' && !session && (
              <PageItem key={`DesktopMainNav_${item.name}`}>
                <AnchorMain
                  name={item.name}
                  path={item.path}
                  isActive={router.asPath === item.path} />
              </PageItem>
            )}
          </>
        ))}
      </PageList>
    </DesktopMainNavWrapper>
  );
};

export default DesktopMainNav;