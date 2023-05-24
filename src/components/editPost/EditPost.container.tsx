import type { FC, FormEvent, MutableRefObject, RefObject } from 'react'
import type { Editor } from "tinymce"

import axios from "axios"
import { useCallback, useEffect, useRef } from "react"
import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container"
import EditPost from "./EditPost"
import gsap from'gsap'
import { useAppDispatch, useAppSelector } from "../../redux/redux_hooks"
import { selectPost, update_post } from "../../redux/slices/postSlice"
import { update_formMessage } from "../../redux/slices/formMessageSlice"

type EditPostType = {
  handleTriggerEditView: () => void
}

export type UpdateOriginalPostType = {
  postTitle: string
  post: {
    baseContent: string
    descriptionContent: string
  }
}

type Res = {
  data: UpdateOriginalPostType
}

const DURATION_OVERLAY = 0.3
const DURATION_SLIDE = 0.5
const BLUR_BUFFER = 0.4
const OVERLAY_HOVER_TO = 0.47
const DELAY_SLIDE = DURATION_OVERLAY / 2

const EditPostContainer: FC<EditPostType> = ({ handleTriggerEditView }) => {
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

  const dispatch = useAppDispatch()
  const {
    postId,
    post
  } = useAppSelector(selectPost)
  
  /* #region Animation */
  const initOverlay = useCallback(() => {
    return gsap.timeline()
      .fromTo(overlayRef.current as HTMLDivElement, {
        alpha: 0
      }, {
        alpha: 1,
        duration: DURATION_OVERLAY,
        ease: "power0"
      })
  }, [])
  
  const initSlide = useCallback(() => {
    return gsap.timeline()
      .fromTo(absoluteRef.current as HTMLDivElement, {
        x: (_, element: HTMLDivElement) => element.getBoundingClientRect().width
      }, {
        x: 0,
        duration: DURATION_SLIDE,
        delay: DELAY_SLIDE,
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

      ltInitSlideRef.current.tweenTo(OVERLAY_HOVER_TO)
    }, BLUR_BUFFER * 1000)
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
    }, BLUR_BUFFER * 1000)
  }, [incrementInstanceIds])

  const handleCloseEdit = useCallback(() => {
    ltInitSlideRef.current.reverse()
    lockHoverBlurRef.current = true

    setTimeout(() => {
      ltInitOverlayRef.current.reverse()
    }, DELAY_SLIDE * 1000)

    setTimeout(() => {
      handleTriggerEditView()
    }, DURATION_SLIDE * 1000)
  }, [handleTriggerEditView])

  useEffect(() => {
    ltInitSlideRef.current = initSlide()
    ltInitOverlayRef.current = initOverlay()

    return () => {
      ltInitSlideRef.current.kill()
      ltInitOverlayRef.current.kill()
    }
  }, [initSlide, initOverlay])

  useEffect(() => {
    const overlayRefInstance = overlayRef.current
    const eventTimeoutInstance = setTimeout(() => {
      overlayRefInstance?.addEventListener('mouseover', handleOverlayHover)
      overlayRefInstance?.addEventListener('mouseleave', handleOverlayBlur)
    }, 750)

    return () => {
      clearTimeout(eventTimeoutInstance)
      overlayRefInstance?.removeEventListener('mouseover', handleOverlayHover)
      overlayRefInstance?.removeEventListener('mouseleave', handleOverlayBlur)
    }
  }, [handleOverlayBlur, handleOverlayHover])
  /* #endregion */

  const triggerErrorMessage = useCallback((message: string) => {
    dispatch(update_formMessage({
      id: "newPostFormMessage",
      message,
      type: StatusMessageTypesEnum.ERROR
    }))
  }, [dispatch])

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
    .then(({ data }: Res) => {
      if(!mountedRef.current) return

      dispatch(update_post({ ...data }))
      dispatch(update_formMessage({
        id: "displayPostFormMessage",
        message: 'You have updated this post!',
        type: StatusMessageTypesEnum.SUCCESS
      }))
      handleCloseEdit()
    })
    .catch(({ response: { data: { message }}}) => {
      if(!mountedRef.current) return

      triggerErrorMessage(message)
    })
  }, [
    dispatch,
    postId,
    triggerErrorMessage,
    handleCloseEdit
  ])

  useEffect(() => {
    mountedRef.current = true
    const body = document.querySelector('body') as HTMLBodyElement
    body.style.overflow = 'hidden'

    return () => {
      mountedRef.current = false
      const body = document.querySelector('body') as HTMLBodyElement
      body.style.overflow = 'unset'
    }
  }, [])

  return (
    <EditPost
      post={post}
      handleCloseEdit={handleCloseEdit}
      baseRef={baseRef as MutableRefObject<Editor>}
      descriptionRef={descriptionRef as MutableRefObject<Editor>}
      handleSubmit={handleSubmit}
      overlayRef={overlayRef as RefObject<HTMLDivElement>}
      absoluteRef={absoluteRef as RefObject<HTMLDivElement>} />
  )
}

export default EditPostContainer