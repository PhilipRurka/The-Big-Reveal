import { FC } from 'react';
import { NavigationsType } from '../../../../utils/navigation';
import MobileMainNav from './MobileMainNav'

type MobileMainNavContainerType = {
  openedBurger: boolean;
  navigationItems: NavigationsType;
}

const MobileMainNavContainer: FC<MobileMainNavContainerType> = ({
  openedBurger,
  navigationItems
}) => {

  return (
    <MobileMainNav
      openedBurger={openedBurger}
      navigationItems={navigationItems} />
  );
};

export default MobileMainNavContainer;