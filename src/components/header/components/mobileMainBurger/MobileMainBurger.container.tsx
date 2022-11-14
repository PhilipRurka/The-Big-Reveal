import { FC, useCallback, useEffect, useRef, useState } from 'react';
import useIsXs from '../../../../hooks/useIsXs';
import MobileMainBurger from './MbileMainBurger'
import gsap from 'gsap';
import { HeaderType } from '../../Header';

const MobileMainBurgerContainer: FC<HeaderType> = ({
  openedBurger,
  handleUpdateBurger
}) => {
  const mobileNavTlRef: React.MutableRefObject<gsap.core.Timeline> = useRef(gsap.timeline({
    paused: true
  }));
  
  const isXs = useIsXs();

  const handleBurgerClick = () => {
    handleUpdateBurger(!openedBurger);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      handleUpdateBurger(false);
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
    if(!isXs) handleUpdateBurger(false);
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
    <MobileMainBurger
      handleBurgerClick={handleBurgerClick}
      openedBurger={openedBurger} />
  );
};

export default MobileMainBurgerContainer;