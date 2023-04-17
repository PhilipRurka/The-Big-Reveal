import { FC, useCallback, useEffect, useRef } from 'react';
import MobileBurger from './MobileBurger'
import gsap from 'gsap';
import { useAppDispatch, useAppSelector } from '../../../../redux/redux_hooks';
import { selectBurgerNav, update_burger_nav } from '../../../../redux/slices/burgerNavSlice';

const MobileBurgerContainer: FC = () => {
  const mobileNavTlRef = useRef<GSAPAnimation | undefined>();

  const dispatch = useAppDispatch()
  const isBurgerOpen = useAppSelector(selectBurgerNav)

  const handleBurgerClick = useCallback(() => {
    dispatch(update_burger_nav(!isBurgerOpen));
  }, [dispatch, isBurgerOpen]);

  const handleListenerKeydown = useCallback((event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      dispatch(update_burger_nav(false));
    }
  }, [dispatch]);

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
    if(isBurgerOpen) {
      if(typeof window === 'undefined') return;

      mobileNavTlRef?.current?.play();
      document.addEventListener('keydown', handleListenerKeydown);

    } else {
      mobileNavTlRef?.current?.reverse();
    };

    return () => {
      if(typeof window === 'undefined' || !isBurgerOpen) return;

      document.removeEventListener('keydown', handleListenerKeydown);
    }
  }, [isBurgerOpen, handleListenerKeydown]);

  return (
    <MobileBurger
      handleBurgerClick={handleBurgerClick}
      isBurgerOpen={isBurgerOpen} />
  );
};

export default MobileBurgerContainer;