import { FC } from 'react';
import { NavigationsType } from '../../../../utils/navigation';
import MobileMainNav from './MobileMainNav'

type MobileMainNavContainerType = {
  openedBurger: boolean;
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
}

const MobileMainNavContainer: FC<MobileMainNavContainerType> = ({
  openedBurger,
  navigationItems,
  handleLogout
}) => {

  return (
    <MobileMainNav
      openedBurger={openedBurger}
      navigationItems={navigationItems}
      handleLogout={handleLogout} />
  );
};

export default MobileMainNavContainer;