import { FC } from 'react';
import { navWithoutAuth } from "../../../../lib/navigation"
import { useRouter } from "next/router"
import {
  DesktopMainNavWrapper,
  PageItem,
  PageList
} from './DesktopMainNav.styled';
import { AnchorMain } from '../../../anchors';

type DesktopMainNavType = {
  hasUser: boolean;
}

const DesktopMainNav: FC<DesktopMainNavType> = () => {
  const router = useRouter()

  return (
    <DesktopMainNavWrapper>
      <PageList>
          {navWithoutAuth.map(({
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