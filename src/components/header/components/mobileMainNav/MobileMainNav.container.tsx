import { FC } from 'react';
import MobileMainNav from './MobileMainNav'

type MobileMainNavContainerType = {
  openedBurger: boolean;
}

const MobileMainNavContainer: FC<MobileMainNavContainerType> = ({ openedBurger }) => {

  return (
    <MobileMainNav
      openedBurger={openedBurger} />
  );
};

export default MobileMainNavContainer;