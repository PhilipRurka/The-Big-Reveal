import { FC } from 'react';
import { NavigationsType, navWithoutAuth } from "../../../../utils/navigation"
import { useRouter } from "next/router"
import {
  DesktopMainNavWrapper,
  PageItem,
  PageList
} from './DesktopMainNav.styled';
import { AnchorMain } from '../../../anchors';

type DesktopMainNavType = {
  navigationItems: NavigationsType;
}

const DesktopMainNav: FC<DesktopMainNavType> = ({
  navigationItems
}) => {
  const router = useRouter()

  return (
    <DesktopMainNavWrapper>
      <PageList>
          {navigationItems.map(({
            name,
            path
          }) => (
            <PageItem key={`DesktopMainNav_${name}`}>
              <AnchorMain
                path={path}
                name={name}
                isActive={router.asPath === path} />
            </PageItem>
          ))}
        </PageList>
    </DesktopMainNavWrapper>
  );
};

export default DesktopMainNav;