import axios from "axios"
import { FC, FormEvent, MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from "react"
import { Editor } from "tinymce"
import { ContentsType } from "../../pages/post/[post-id]"
import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container"
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

const durationGsapOverlay = 0.3
const durationGsapSlide = 0.5
const hoverBlurBuffer = 0.4

const delayGsapSlide = durationGsapOverlay / 2

const overlayHoverTo = 0.47


const EditPostContainer: FC<EditPostType> = ({
  postId,
  handleTriggerEditView,
  updateOriginalPost,
  post
}) => {
  const mountedRef = useRef(true)
  const baseRef = useRef<Editor>()
  const descriptionRef = useRef<Editor>()
  const ltInitSlideRef = useRef<gsap.core.Timeline>(gsap.timeline())
  const ltInitOverlayRef = useRef<gsap.core.Timeline>(gsap.timeline())
  const overlayRef = useRef<HTMLDivElement>()
  const absoluteRef = useRef<HTMLDivElement>()
  // FRONTEND: hoverInstanceIdRef & blurInstanceIdRef could be contained onto one object
  const hoverInstanceIdRef = useRef<number>(0)
  const blurInstanceIdRef = useRef<number>(0)
  const lockHoverBlurRef = useRef<boolean>(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  
  const initOverlay = useCallback(() => {
    return gsap.timeline()
      .fromTo(overlayRef.current as HTMLDivElement, {
        alpha: 0
      }, {
        alpha: 1,
        duration: durationGsapOverlay,
        ease: "power0"
      })
  }, [])
  
  const initSlide = useCallback(() => {
    return gsap.timeline()
      .fromTo(absoluteRef.current as HTMLDivElement, {
        x: (_, element: HTMLDivElement) => element.getBoundingClientRect().width
      }, {
        x: 0,
        duration: durationGsapSlide,
        delay: delayGsapSlide,
        ease: "power3.inOut"
      })
  }, [])

  const incrementInstanceIds = useCallback(() => {
    hoverInstanceIdRef.current++
    blurInstanceIdRef.current++
  }, [])

  const handleOverlayHover = useCallback(() => {
    incrementInstanceIds()
    const currentInstanceId = hoverInstanceIdRef.current
    

    setTimeout(() => {
      if(lockHoverBlurRef.current || hoverInstanceIdRef.current !== currentInstanceId) return

      ltInitOverlayRef.current.reverse()

      ltInitSlideRef.current.tweenTo(overlayHoverTo)
    }, hoverBlurBuffer * 1000)
  }, [incrementInstanceIds])

  const handleOverlayBlur = useCallback(() => {
    incrementInstanceIds()
    const currentInstanceId = blurInstanceIdRef.current

    setTimeout(() => {
      if(lockHoverBlurRef.current || blurInstanceIdRef.current !== currentInstanceId) return

      ltInitOverlayRef.current.play()

      /** Start from anywhere, to the end of the animation */
      const to = ltInitSlideRef.current.duration()
      ltInitSlideRef.current.tweenTo(to)
    }, hoverBlurBuffer * 1000)
  }, [incrementInstanceIds])

  const handleCloseEdit = useCallback(() => {
    ltInitSlideRef.current.reverse()
    lockHoverBlurRef.current = true

    setTimeout(() => {
      ltInitOverlayRef.current.reverse()
    }, delayGsapSlide * 1000)

    setTimeout(() => {
      handleTriggerEditView()
    }, durationGsapSlide * 1000)
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

    axios.post(`/api/post/${postId}`, {
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
  }, [
    postId,
    updateOriginalPost,
    triggerErrorMessage,
    handleCloseEdit
  ])

  useEffect(() => {
    ltInitSlideRef.current = initSlide()
    ltInitOverlayRef.current = initOverlay()

    return () => {
      ltInitSlideRef.current.kill()
      ltInitOverlayRef.current.kill()
    }
  }, [initSlide, initOverlay])

  useEffect(() => {
    mountedRef.current = true

    const body = document.querySelector('body') as HTMLBodyElement
    body.style.overflow = 'hidden'

    const overlayRefInstance = overlayRef.current

    const eventTimeoutInstance = setTimeout(() => {
      overlayRefInstance?.addEventListener('mouseover', handleOverlayHover)
      overlayRefInstance?.addEventListener('mouseleave', handleOverlayBlur)
    }, 750)

    return () => {
      mountedRef.current = false
      body.style.overflow = 'unset'
      clearTimeout(eventTimeoutInstance)
      overlayRefInstance?.removeEventListener('mouseover', handleOverlayHover)
      overlayRefInstance?.removeEventListener('mouseleave', handleOverlayBlur)
    }
  }, [handleOverlayBlur, handleOverlayHover])

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