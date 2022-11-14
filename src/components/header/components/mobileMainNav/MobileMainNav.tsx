import React, { FC } from 'react';
import { AnchorMain } from '../../../anchors';
import { useRouter } from "next/router"
import {
  BurgerButton,
  MobileMainNavContent,
  MobileMainNavWrapper,
  PageItem,
  PageList
} from './MobileMainNav.styled';
import { mainNavigation } from '../../../../lib/navigation';

type MobileMainNavType = {
  openedBurger: boolean;
  handleBurgerClick: () => void;
}

const MobileMainNav: FC<MobileMainNavType> = ({
  openedBurger,
  handleBurgerClick
}) => {
  const router = useRouter()

  return (
    <MobileMainNavWrapper>
      <BurgerButton
        className={openedBurger ? 'opened' : ''}
        aria-label='Open Mobile Menu'
        onClick={handleBurgerClick} >
        <span aria-hidden />
        <span aria-hidden />
      </BurgerButton>
      <MobileMainNavContent openedBurger={openedBurger}>
        <PageList>
          {mainNavigation.map(({
            name,
            path
          }) => (
            <PageItem key={`MobileMainNavWrapper_${name}`}>
              <AnchorMain
                path={path}
                name={name}
                isActive={router.asPath === path} />
            </PageItem>
          ))}
        </PageList>
      </MobileMainNavContent>
    </MobileMainNavWrapper>
  );
};

export default MobileMainNav;