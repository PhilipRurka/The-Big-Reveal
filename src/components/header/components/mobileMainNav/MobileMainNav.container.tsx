import { FC } from 'react';
import MobileMainNav from './MobileMainNav'

type MobileMainNavContainerType = {
  openedBurger: boolean;
  hasUser: boolean;
}

const MobileMainNavContainer: FC<MobileMainNavContainerType> = ({
  openedBurger,
  hasUser
}) => {

  return (
    <MobileMainNav
      openedBurger={openedBurger}
      hasUser={hasUser} />
  );
};

export default MobileMainNavContainer;