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
import { MobileBurgerType } from '../mobileBurger/MobileBurger.container';
import MobileBurger from '../mobileBurger';
import GoaldenLogo from '../goaldenLogo/GoaldenLogo';

type DesktopHeaderType = MobileBurgerType & {
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
  router: NextRouter
  isXs: undefined | boolean
}

const DesktopNav: FC<DesktopHeaderType> = ({
  navigationItems,
  handleLogout,
  router,
  openedBurger,
  handleUpdateBurger,
  isXs
}) => {
  return (
    <DesktopHeaderWrapper>
      <GoaldenLogo />
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
        <MobileBurger
          openedBurger={openedBurger}
          handleUpdateBurger={handleUpdateBurger} />
      )}
    </DesktopHeaderWrapper>
  );
};

export default DesktopNav;