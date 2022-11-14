import React, { FC } from 'react';
import { AnchorMain } from '../../../anchors';
import { useRouter } from "next/router"
import {
  MobileMainNavWrapper,
  PageItem,
  PageList
} from './MobileMainNav.styled';
import { mainNavigation } from '../../../../lib/navigation';

type MobileMainNavType = {
  openedBurger: boolean;
}

const MobileMainNav: FC<MobileMainNavType> = ({
  openedBurger
}) => {
  const router = useRouter()

  return (
    <MobileMainNavWrapper openedBurger={openedBurger}>
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
    </MobileMainNavWrapper>
  );
};

export default MobileMainNav;