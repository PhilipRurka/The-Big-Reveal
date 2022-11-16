import { FC, useCallback, useEffect, useRef } from 'react';
import useIsXs from '../../../../hooks/useIsXs';
import MobileMainBurger from './MbileMainBurger'
import gsap from 'gsap';

export type MobileMainBurgerType = {
  openedBurger: boolean;
  handleUpdateBurger: (openBurger: boolean) => void;
}

const MobileMainBurgerContainer: FC<MobileMainBurgerType> = ({
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

  const handleListenerKeydown = (event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      handleUpdateBurger(false);
    }
  };

  const handleListenerClick = () => {
    handleUpdateBurger(false);
  }

  // const initGsap = useCallback((): void => {
  //   mobileNavTlRef.current.to('#mobileMenu', {
  //     autoAlpha: 1,
  //     duration: 0.3,
  //     ease: "power1.out"
  //   });
  // }, []);
  
  // useEffect(() => {
  //   initGsap();
  // }, []);

  useEffect(() => {
    if(!isXs) handleUpdateBurger(false);
  }, [isXs]);

  useEffect(() => {
    let mainElement: HTMLElement | null
    
    if(openedBurger) {
      if(typeof window === 'undefined') return;

      mobileNavTlRef.current.play();
      document.addEventListener('keydown', handleListenerKeydown);

      mainElement = document.querySelector('main');
      mainElement?.addEventListener('click', handleListenerClick);

    } else {
      mobileNavTlRef.current.reverse();
    };

    return () => {
      if(typeof window === 'undefined' || !openedBurger) return;

      document.removeEventListener('keydown', handleListenerKeydown);
      mainElement?.removeEventListener('click', handleListenerClick);
    }
  }, [openedBurger]);

  return (
    <MobileMainBurger
      handleBurgerClick={handleBurgerClick}
      openedBurger={openedBurger} />
  );
};

export default MobileMainBurgerContainer;