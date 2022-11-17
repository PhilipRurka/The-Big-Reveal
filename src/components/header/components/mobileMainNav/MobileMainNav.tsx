import React, { FC } from 'react';
import { AnchorMain } from '../../../anchors';
import { useRouter } from "next/router"
import {
  MobileMainNavWrapper,
  PageItem,
  PageList
} from './MobileMainNav.styled';
import { NavigationsType } from '../../../../utils/navigation';

type MobileMainNavType = {
  openedBurger: boolean;
  navigationItems: NavigationsType
}

const MobileMainNav: FC<MobileMainNavType> = ({
  openedBurger,
  navigationItems
}) => {
  const router = useRouter()

  return (
    <MobileMainNavWrapper openedBurger={openedBurger}>
      <PageList>
        {(navigationItems || []).map(({
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