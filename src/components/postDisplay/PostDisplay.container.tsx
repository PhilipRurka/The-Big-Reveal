import { FC, useCallback, useEffect, useRef, useState } from "react"
import PostDisplay from "./PostDisplay"
import gsap from "gsap"
import dayjs from "dayjs"
import { ContentsType } from "../../pages/post/[post-id]"
import { FormMessageContainerType } from "../formMessage/FormMessage.container"

export type PostDisplayType = {
  username: string
  profilePath: string
  post: ContentsType
  createdAt: string
  isAuthor?: boolean
  handleTriggerEditView?: () => void
  handleTriggerDeleteView?: () => void
  formMessage?: FormMessageContainerType
}

const PostDisplayContainer: FC<PostDisplayType> = ({
  username,
  profilePath,
  post,
  createdAt: rawDate,
  isAuthor,
  handleTriggerEditView,
  handleTriggerDeleteView,
  formMessage
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
      post={post}
      profilePath={profilePath}
      handleRevealDescription={revealDescription}
      isAuthor={isAuthor}
      handleTriggerEditView={handleTriggerEditView}
      handleTriggerDeleteView={handleTriggerDeleteView}
      formMessage={formMessage} />
  )
}

export default PostDisplayContainer