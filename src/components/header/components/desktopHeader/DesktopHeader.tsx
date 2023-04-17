import { FC } from 'react';
import { NavigationsType } from "../../../../utils/navigation"
import { NextRouter } from "next/router"
import { NavLink } from '../../../anchors';
import { NewPostButton } from '../../../anchors/Anchors.styled';
import {
  DesktopHeaderWrapper,
  PageItem,
  PageList
} from './DesktopHeader.styled';
import MobileBurger from '../mobileBurger';
import BrandLogo from '../brandLogo/BrandLogo';

type DesktopHeaderType = {
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
  router: NextRouter
  isXs: undefined | boolean
}

const DesktopNav: FC<DesktopHeaderType> = ({
  navigationItems,
  handleLogout,
  router,
  isXs
}) => {
  return (
    <DesktopHeaderWrapper>
      <BrandLogo />
      {!isXs ? (
        <PageList>
          {navigationItems.map(({
            named,
            path
          }) => {
            const key = `DesktopHeader_${named}`

            if(path === '/new-post') {
              return (
                <PageItem key={key}>
                  <NewPostButton
                    href={path}
                    $isActive={router.asPath === path} >
                    New
                  </NewPostButton>
                </PageItem>
              )

            } else if(named === 'Logout') {
              return (
                <PageItem key={key}>
                  <NavLink trigger={handleLogout} >
                  { named }
                  </NavLink>
                </PageItem>
              )

            } else {
              return (
                <PageItem key={key}>
                  <NavLink
                    path={path}
                    isActive={router.asPath === path} >
                    { named }
                  </NavLink>     
                </PageItem>
              )
            }
          })}
        </PageList>
      ): (
        <MobileBurger />
      )}
    </DesktopHeaderWrapper>
  );
};

export default DesktopNav;