import React, { FC, useMemo } from 'react';
import { AnchorMain } from '../../../anchors';
import { useRouter } from "next/router"
import {
  MobileMainNavWrapper,
  PageItem,
  PageList
} from './MobileMainNav.styled';
import { navWithAuth, navWithoutAuth } from '../../../../lib/navigation';

type MobileMainNavType = {
  openedBurger: boolean;
  hasUser: boolean;
}

const MobileMainNav: FC<MobileMainNavType> = ({
  openedBurger,
  hasUser
}) => {
  const router = useRouter()

  const navigationItems = useMemo(() => {
    if(hasUser) {
      return navWithAuth

    } else {
      return navWithoutAuth
    }
  }, [hasUser])

  console.log({
    navigationItems
  })

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