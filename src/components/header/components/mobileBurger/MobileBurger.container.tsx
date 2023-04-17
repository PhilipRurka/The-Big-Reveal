import { FC, useCallback, useEffect, useRef } from 'react';
import MobileBurger from './MobileBurger'
import gsap from 'gsap';

export type MobileBurgerType = {
  openedBurger: boolean;
  handleUpdateBurger: (openBurger: boolean) => void;
}

const MobileBurgerContainer: FC<MobileBurgerType> = ({
  openedBurger,
  handleUpdateBurger
}) => {

  const mobileNavTlRef = useRef<GSAPAnimation | undefined>();

  const handleBurgerClick = () => {
    handleUpdateBurger(!openedBurger);
  };

  const handleListenerKeydown = useCallback((event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      handleUpdateBurger(false);
    }
  }, [handleUpdateBurger]);

  const handleListenerClick = useCallback(() => {
    handleUpdateBurger(false);
  }, [handleUpdateBurger])

  const initGsap = useCallback((): void => {
    if(window === undefined) return

    mobileNavTlRef.current = gsap.fromTo('#mobileMenu', {
      height: 0
    } ,{
      height: window.innerHeight - 50,
      duration: 0.8,
      ease: "power3.inOut"
    });
  }, []);
  
  useEffect(() => {
    initGsap();

    return () => {
      mobileNavTlRef?.current?.kill()
    }
  }, [initGsap]);

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
  }, [openedBurger, handleListenerClick, handleListenerKeydown]);

  return (
    <MobileBurger
      handleBurgerClick={handleBurgerClick}
      openedBurger={openedBurger} />
  );
};

export default MobileBurgerContainer;