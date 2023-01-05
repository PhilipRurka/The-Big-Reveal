import { useCallback, useEffect, useRef, useState } from "react";
import { BreakObj } from "../styled/layout-styled";

const useIsXs = () => {
  const matchMedia_ref = useRef<MediaQueryList>();
  const [isXs, setIsXs] = useState<boolean>();

  const updateState = useCallback((_isXs: MediaQueryList | MediaQueryListEvent) : void => {
    setIsXs(_isXs.matches);
  }, []);

  useEffect(() => {
    if(typeof window === 'undefined') return;
    
    const mediaQuery: string = `(max-width: ${BreakObj.xs.breakpoint.break.toString()}px)`
    matchMedia_ref.current = window.matchMedia(mediaQuery);
    updateState(matchMedia_ref.current);
    matchMedia_ref.current.addEventListener('change', updateState);

    return () => {
      matchMedia_ref.current?.removeEventListener('change', updateState);
    };
  }, []);

  return isXs;
};

export default useIsXs;