import { FC } from 'react';
import {
  MobileBurgerWrapper,
} from './MobileBurger.styled';

type MobileBurgerType = {
  openedBurger: boolean;
  handleBurgerClick: () => void;
}

const MobileBurger: FC<MobileBurgerType> = ({
  openedBurger,
  handleBurgerClick
}) => {

  return (
      <MobileBurgerWrapper
        className={openedBurger ? 'opened' : ''}
        aria-label='Open Mobile Menu'
        onClick={handleBurgerClick} >
        <span aria-hidden />
        <span aria-hidden />
      </MobileBurgerWrapper>
  );
};

export default MobileBurger;