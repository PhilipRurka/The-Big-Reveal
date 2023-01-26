import { FC, MutableRefObject, useCallback, useEffect, useRef } from 'react';
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

  const mobileNavTlRef: MutableRefObject<GSAPAnimation | undefined> = useRef();

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

  const initGsap = useCallback((): void => {
    mobileNavTlRef.current = gsap.fromTo('#mobileMenu', {
      height: 0
    } ,{
      height: 66,
      duration: 0.3,
      ease: "power1.out"
    });
  }, []);
  
  useEffect(() => {
    initGsap();

    return () => {
      mobileNavTlRef?.current?.kill()
    }
  }, []);

  useEffect(() => {
    let mainElement: HTMLElement | null

    
    if(openedBurger) {
      if(typeof window === 'undefined') return;

      mobileNavTlRef?.current?.play();
      document.addEventListener('keydown', handleListenerKeydown);

      mainElement = document.querySelector('main');
      mainElement?.addEventListener('click', handleListenerClick);

    } else {
      mobileNavTlRef?.current?.reverse();
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