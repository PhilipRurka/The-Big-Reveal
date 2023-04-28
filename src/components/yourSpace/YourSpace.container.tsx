import { FC, useCallback, useEffect, useRef } from "react"
import YourSpace from "./YourSpace"
import gsap from "gsap"
import { YourSpaceDataType } from "../../../pages/your-space"

const YourSpaceContainer: FC<YourSpaceDataType> = ({
  list,
  host,
  path,
  username
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
  }, [path, host])

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
      list={list}
      path={path}
      handleCopy={handleCopy}
      username={username} />
  )
}

export default YourSpaceContainer