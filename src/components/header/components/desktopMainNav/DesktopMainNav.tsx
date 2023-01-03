import { FC } from 'react';
import { NavigationsType } from "../../../../utils/navigation"
import { useRouter } from "next/router"
import {
  DesktopMainNavWrapper,
  PageItem,
  PageList
} from './DesktopMainNav.styled';
import { AnchorMain } from '../../../anchors';
import { useAppSelector } from '../../../../redux/redux_hooks';
import { selectUserData } from '../../../../redux/slices/userSlice';

type DesktopMainNavType = {
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
}

const DesktopMainNav: FC<DesktopMainNavType> = ({
  navigationItems,
  handleLogout
}) => {
  const router = useRouter()
  const { session: userSession } = useAppSelector(selectUserData)

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
          <>
            {item.path === '/login' && !!!userSession && (
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