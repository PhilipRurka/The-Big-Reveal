import { FC } from 'react';
import {
  MobileBurgerStyled,
} from './MobileBurger.styled';

type MobileBurgerType = {
  isBurgerOpen: boolean;
  handleBurgerClick: () => void;
}

const MobileBurger: FC<MobileBurgerType> = ({
  isBurgerOpen,
  handleBurgerClick
}) => {

  return (
      <MobileBurgerStyled
        className={isBurgerOpen ? 'opened' : ''}
        aria-label='Open Mobile Menu'
        onClick={handleBurgerClick} >
        <span aria-hidden />
        <span aria-hidden />
      </MobileBurgerStyled>
  );
};

export default MobileBurger;