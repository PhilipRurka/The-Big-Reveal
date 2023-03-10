import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppSelector } from '../../../../redux/redux_hooks';
import { selectUser } from '../../../../redux/slices/userSlice';
import { NavigationsType } from '../../../../utils/navigation';
import MobileMainNav from './MobileMainNav'

type MobileMainNavContainerType = {
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
}

const MobileMainNavContainer: FC<MobileMainNavContainerType> = ({
  navigationItems,
  handleLogout
}) => {

  const router = useRouter()
  const { session: userSession } = useAppSelector(selectUser)

  return (
    <MobileMainNav
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      router={router}
      userSession={userSession} />
  );
};

export default MobileMainNavContainer;