import { FC, useCallback, useEffect, useRef, useState } from 'react';
import useIsXs from '../../../../hooks/useIsXs';
import MobileMainNav from './MobileMainNav'
import gsap from 'gsap';

const MobileMainNavContainer: FC = () => {
  const mobileNavTlRef: React.MutableRefObject<gsap.core.Timeline> = useRef(gsap.timeline({
    paused: true
  }));
  const [openedBurger, setOpenedBurger] = useState<boolean>(false);
  const isXs = useIsXs();

  const handleBurgerClick = () => {
    setOpenedBurger(!openedBurger);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      setOpenedBurger(false);
    }
  };

  const initGsap = useCallback((): void => {
    mobileNavTlRef.current.to('#mobileMenu', {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power1.out"
    });
  }, []);
  
  useEffect(() => {
    initGsap();
  }, []);

  useEffect(() => {
    if(!isXs) setOpenedBurger(false);
  }, [isXs]);

  useEffect(() => {
    if(openedBurger) {
      if(typeof window === 'undefined') return;

      mobileNavTlRef.current.play();
      document.addEventListener('keydown', handleKeydown);

    } else {
      mobileNavTlRef.current.reverse();
    };

    return () => {
      if(typeof window === 'undefined' || !openedBurger) return;

      document.removeEventListener('keydown', handleKeydown);
    }
  }, [openedBurger]);

  return (
    <MobileMainNav
      handleBurgerClick={handleBurgerClick}
      openedBurger={openedBurger} />
  );
};

export default MobileMainNavContainer;