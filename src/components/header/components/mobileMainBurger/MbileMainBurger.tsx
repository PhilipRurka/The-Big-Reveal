import { FC } from 'react';
import {
  MobileMainBurgerWrapper,
} from './MbileMainBurger.styled';

type MobileMainNavType = {
  openedBurger: boolean;
  handleBurgerClick: () => void;
}

const MobileMainNav: FC<MobileMainNavType> = ({
  openedBurger,
  handleBurgerClick
}) => {

  return (
      <MobileMainBurgerWrapper
        className={openedBurger ? 'opened' : ''}
        aria-label='Open Mobile Menu'
        onClick={handleBurgerClick} >
        <span aria-hidden />
        <span aria-hidden />
      </MobileMainBurgerWrapper>
  );
};

export default MobileMainNav;