import { FC } from 'react';
import { mainNavigation } from "../../../../lib/navigation"
import { useRouter } from "next/router"
import {
  DesktopMainNavWrapper,
  PageItem,
  PageList
} from './DesktopMainNav.styled';
import { AnchorMain } from '../../../anchors';

const DesktopMainNav: FC = () => {
  const router = useRouter()

  return (
    <DesktopMainNavWrapper>
      <PageList>
          {mainNavigation.map(({
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