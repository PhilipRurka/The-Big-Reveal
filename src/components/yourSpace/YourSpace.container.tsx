import { FC, useCallback, useEffect, useRef } from "react"
import YourSpace from "./YourSpace"
import { YourSpaceDataType } from "../../../pages/your-space"
import gsap from "gsap"

const YourSpaceContainer: FC<YourSpaceDataType> = ({
  profileData: {
    path,
    ...profileData
  },
  baseData,
  host
}) => {
  const tlCopiedRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`https://${host}/${path}`);
    tlCopiedRef.current.play()

    setTimeout(() => {
      tlCopiedRef.current.reverse()
    }, 500)
  }, [path])

  const initCopyGsap = useCallback(() => {
    tlCopiedRef.current.fromTo('#copy-to-clipboard', {
      alpha: 0,
      pointerEvents: "none"
    }, {
      alpha: 1,
      pointerEvents: "auto",
      duration: 0.3,
      ease: 'power1.out'
    }, 0)
  }, [])

  useEffect(() => {
    initCopyGsap()
    const copyTimelineInstance = tlCopiedRef.current

    return () => {
      copyTimelineInstance.kill()
    }
  }, [initCopyGsap])
  
  return (
    <YourSpace
      {...profileData}
      path={path}
      yourWorkList={baseData}
      handleCopy={handleCopy} />
  )
}

export default YourSpaceContainer