import { FC, useCallback, useEffect, useRef, useState } from "react"
import PostDisplay from "./PostDisplay"
import gsap from "gsap"
import { FormMessageContainerType } from "../formMessage/FormMessage.container"
import { useAppSelector } from "../../redux/redux_hooks"
import { selectPost } from "../../redux/slices/postSlice"

export type PostDisplayType = {
  handleTriggerEditView?: () => void
  handleTriggerDeleteView?: () => void
  formMessage?: FormMessageContainerType
}

const PostDisplayContainer: FC<PostDisplayType> = ({ ...args }) => {
  const descriptioncContentRef = useRef<HTMLDivElement>(null);
  const tlDescriptionRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))

  const [isDescriptionRevlealed, setIsDescriptionRevlealed] = useState(false)

  const post = useAppSelector(selectPost)

  const initGsap = useCallback(() => {
    tlDescriptionRef.current.fromTo('#description-section', {
      height: 0
    }, {
      duration: 0.8,
      ease: 'power1.inOut',
      height: descriptioncContentRef.current?.clientHeight,
    }, 0)
  }, [post])

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

  return (
    <PostDisplay
      {...args}
      post={post}
      ref={descriptioncContentRef}
      handleRevealDescription={revealDescription} />
  )
}

export default PostDisplayContainer