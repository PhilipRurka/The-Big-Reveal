import axios from "axios"
import { FC, FormEvent, MutableRefObject, RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Editor } from "tinymce"
import { ContentsType } from "../../pages/post/[post-id]"
import { StatusMessageTypesEnum } from "../FormMessage/FormMessage.container"
import { UpdateOriginalPostFunctionType } from "../post/Post.container"
import EditPost from "./EditPost"
import gsap from'gsap'

type EditPostType = {
  postId: string
  post: ContentsType
  handleTriggerEditView: () => void
  updateOriginalPost: UpdateOriginalPostFunctionType
}

export type UpdateOriginalPostType = {
  baseContent: string
  descriptionContent: string
}

const EditPostContainer: FC<EditPostType> = ({
  postId,
  handleTriggerEditView,
  updateOriginalPost,
  post
}) => {
  const mountedRef = useRef(true)
  const baseRef = useRef<Editor>()
  const descriptionRef = useRef<Editor>()
  const initialAnimationRef = useRef<gsap.core.Timeline>(gsap.timeline())
  const hoverAnimationRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))
  const overlayRef = useRef<HTMLDivElement>()
  const absoluteRef = useRef<HTMLDivElement>()
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()
  const blurTimeoutRef = useRef<NodeJS.Timeout>()

  const [errorMessage, setErrorMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const initialAnimation = useCallback(() => {
    return gsap.timeline().fromTo(overlayRef.current as HTMLDivElement, {
      alpha: 0
    }, {
      alpha: 1,
      duration: 0.5,
      ease: "power1.inOut"
    })
    .fromTo(absoluteRef.current as HTMLDivElement, {
      x: (_, element: HTMLDivElement) => element.getBoundingClientRect().width
    }, {
      x: 0,
      duration: 0.5,
      ease: "power1.inOut"
    }, "-=50%")
  }, [])

  const handleOverlayHover = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      /** Prevents the case where both are triggered at the same time */
      clearTimeout(blurTimeoutRef.current)

      /** Starting from the end of the animation */
      const from = initialAnimationRef.current.duration()
      /** 75% from the end of the animation */
      const to = from * 0.75

      initialAnimationRef.current.tweenFromTo(from, to)
    }, 400)
  }, [])

  const handleOverlayBlur = useCallback(() => {
    /** Prevents the case where both are triggered at the same time */
    clearTimeout(hoverTimeoutRef.current)

    blurTimeoutRef.current = setTimeout(() => {
      /** Start from anywhere, to the end of the animation */
      const to = initialAnimationRef.current.duration()
      initialAnimationRef.current.tweenTo(to)
    }, 400)
  }, [])

  const handleCloseEdit = useCallback(() => {
    initialAnimationRef.current.reverse()
    setTimeout(() => {
      handleTriggerEditView()
    }, 750)
  }, [handleTriggerEditView])

  const triggerErrorMessage = useCallback((message: string) => {
    setErrorMessage(message)
    setShowMessage(true)
  }, [])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if(!baseRef.current?.getContent()) {
      triggerErrorMessage('The "Drop that poem" section musn\'t be empty')
      return
    }

    const baseContent = baseRef.current.getContent()
    const descriptionContent = descriptionRef.current?.getContent() || null

    axios.post('/api/post', {
      postId,
      baseContent,
      descriptionContent
    })
    .then(({ data }) => {
      if(!mountedRef.current) return

      updateOriginalPost(data as UpdateOriginalPostType)
      handleCloseEdit()
    })
    .catch(({ response: { data: { message }}}) => {
      if(!mountedRef.current) return

      triggerErrorMessage(message)
    })
  }, [postId, handleTriggerEditView, updateOriginalPost, triggerErrorMessage])

  useEffect(() => {
    initialAnimationRef.current = initialAnimation()

    return () => {
      initialAnimationRef?.current?.kill()
      hoverAnimationRef.current?.kill()
    }
  }, [initialAnimation])

  useEffect(() => {
    mountedRef.current = true

    const body = document.querySelector('body') as HTMLBodyElement
    body.style.overflow = 'hidden'

    setTimeout(() => {
      overlayRef.current?.addEventListener('mouseover', handleOverlayHover)
      overlayRef.current?.addEventListener('mouseleave', handleOverlayBlur)
    }, 750)

    return () => {
      mountedRef.current = false
      body.style.overflow = 'unset'
      overlayRef.current?.removeEventListener('mouseover', handleOverlayHover)
      overlayRef.current?.removeEventListener('mouseleave', handleOverlayBlur)
    }
  }, [])

  return (
    <EditPost
      handleCloseEdit={handleCloseEdit}
      baseRef={baseRef as MutableRefObject<Editor>}
      descriptionRef={descriptionRef as MutableRefObject<Editor>}
      post={post}
      handleSubmit={handleSubmit}
      formMessageProps={{
        message: errorMessage,
        showMessage,
        type: StatusMessageTypesEnum.ERROR
      }}
      overlayRef={overlayRef as RefObject<HTMLDivElement>}
      absoluteRef={absoluteRef as RefObject<HTMLDivElement>} />
  )
}

export default EditPostContainer