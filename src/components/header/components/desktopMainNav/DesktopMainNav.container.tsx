import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppSelector } from '../../../../redux/redux_hooks';
import { selectUserData } from '../../../../redux/slices/userSlice';
import { NavigationsType } from '../../../../utils/navigation';
import DesktopMainNav from './DesktopMainNav'

type DesktopMainNavContainerType = {
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
}

const DesktopMainNavContainer: FC<DesktopMainNavContainerType> = ({
  navigationItems,
  handleLogout
}) => {

  const router = useRouter()
  const { session: userSession } = useAppSelector(selectUserData)

  return (
    <DesktopMainNav
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      router={router}
      userSession={userSession} />
  );
};

export default DesktopMainNavContainer;