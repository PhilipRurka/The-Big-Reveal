import { FC, useCallback, useEffect, useRef, useState } from "react"
import PostDisplay from "./PostDisplay"
import { PostType } from "../post/Post"
import gsap from "gsap"
import dayjs from "dayjs"

type PostDisplayContainerType = PostType

const PostDisplayContainer: FC<PostDisplayContainerType> = ({
  profile_path,
  author_username,
  created_at: rawDate,
  cleanBase,
  cleanDescription
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
    setDate(dayjs(rawDate).format('D MMM YYYY, h:ss a'))
  }, [rawDate])

  return (
    <PostDisplay
      ref={descriptioncContentRef}
      author_username={author_username}
      created_at={date}
      cleanBase={cleanBase}
      cleanDescription={cleanDescription}
      handleRevealDescription={revealDescription}
      profile_path={profile_path} />
  )
}

export default PostDisplayContainer