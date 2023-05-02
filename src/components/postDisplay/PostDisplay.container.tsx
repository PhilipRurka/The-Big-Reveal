import { FC, useCallback, useEffect, useRef, useState } from "react"
import PostDisplay from "./PostDisplay"
import gsap from "gsap"
import dayjs from "dayjs"
import { PostDataType } from "../../pages/post/[post-id]"

type PostDisplayContainerType = PostDataType

const PostDisplayContainer: FC<PostDisplayContainerType> = ({
  username,
  profilePath,
  baseContent,
  descriptionContent,
  created_at: rawDate
}) => {
  const descriptioncContentRef = useRef<HTMLDivElement>(null);
  const tlDescriptionRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))

  const [date, setDate] = useState('')
  const [isDescriptionRevlealed, setIsDescriptionRevlealed] = useState(false)

  const initGsap = useCallback(() => {
    tlDescriptionRef.current.fromTo('#description-section', {
      height: 0
    }, {
      duration: 0.8,
      ease: 'power1.inOut',
      height: descriptioncContentRef.current?.clientHeight,
    }, 0)
  }, [])

  const revealDescription = () => {
    setIsDescriptionRevlealed(true)
  }

  useEffect(() => {
    if(isDescriptionRevlealed) {
      tlDescriptionRef.current.play()

    } else {
      tlDescriptionRef.current.reverse()
    }
  }, [isDescriptionRevlealed])

  useEffect(() => {
    initGsap()
    
    let tlDescriptionScoped = tlDescriptionRef.current

    return () => {
      tlDescriptionScoped?.kill()
    }
  }, [initGsap])

  useEffect(() => {
    if(!rawDate) return
    setDate(dayjs(rawDate).format('D MMM YYYY, h:ss a'))
  }, [rawDate])

  return (
    <PostDisplay
      ref={descriptioncContentRef}
      username={username}
      created_at={date}
      baseContent={baseContent}
      descriptionContent={descriptionContent}
      profilePath={profilePath}
      handleRevealDescription={revealDescription} />
  )
}

export default PostDisplayContainer