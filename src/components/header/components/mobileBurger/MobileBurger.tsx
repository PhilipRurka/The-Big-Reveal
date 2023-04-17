import { FC } from 'react';
import {
  MobileBurgerWrapper,
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
      <MobileBurgerWrapper
        className={isBurgerOpen ? 'opened' : ''}
        aria-label='Open Mobile Menu'
        onClick={handleBurgerClick} >
        <span aria-hidden />
        <span aria-hidden />
      </MobileBurgerWrapper>
  );
};

export default MobileBurger;