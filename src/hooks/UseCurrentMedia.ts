import { useEffect, useState } from "react";
import UseIsXs from "./UseIsXs";

const UseCurrentMedia = () => {
  const [currentMedia, setCurrentMedia] = useState<string>();
  const isXl = UseIsXs();
  // const isSm = UseIsSm();
  const medias = [
    [ 'xl', isXl ],
    // [ 'sm', UseIsSm() ]
  ] as const;

  useEffect(() => {
    for (let i = 0; i < medias.length; i++) {
      const [
        name,
        isTrue
      ] = medias[i];

      if(isTrue) {
        setCurrentMedia(name);
        break;
      }
    }
  }, [isXl]);

  return currentMedia;
}