import type { FC, RefObject } from 'react'

import { useCallback, useEffect, useMemo, useRef } from "react"
import DeletePostModal from "./DeletePostModal"
import gsap from 'gsap'
import { decode } from 'html-entities';
import axios from "axios";
import Router from "next/router";
import { selectPost } from "../../redux/slices/postSlice";
import { useAppSelector } from "../../redux/redux_hooks";

type DeletePostModule = {
  handleTriggerDeleteView: () => void
}

const DeletePostModalContainer: FC<DeletePostModule> = ({
  handleTriggerDeleteView
}) => {
  const overlayRef = useRef<HTMLDivElement>()
  const absoluteRef = useRef<HTMLDivElement>()
  const tlAnimationRef = useRef<gsap.core.Timeline>(gsap.timeline())
  const {
    postTitle,
    postId,
  } = useAppSelector(selectPost)

  const initAnimation = useCallback(() => {
    return gsap.timeline()
      .fromTo(overlayRef?.current || '', {
        alpha: 0
      }, {
        alpha: 1,
        duration: 0.3,
        ease: 'power0'
      }, 0)
      .fromTo(absoluteRef?.current || '', {
        alpha: 0,
        y: (_, element: HTMLDivElement) => -(element.getBoundingClientRect().width - 100)
      }, {
        alpha: 1,
        y: (_, element: HTMLDivElement) => -(element.getBoundingClientRect().width / 2),
        duration: 0.3,
        ease: 'power1.inOut'
      }, `+-=50%`)
  }, [])

  const handleDeletePost = useCallback((): void => {
    axios.delete(`/api/post/${postId}`)
    .then(() => {
      Router.push('/your-space')
    })
    .catch(() => {
      
    })
  }, [postId])

  const handleCloseDelete = useCallback(() => {
    tlAnimationRef.current.reverse()
    
    setTimeout(() => {
      handleTriggerDeleteView()
    }, 450)
  }, [handleTriggerDeleteView])

  const decodedTitle = useMemo(() => decode(postTitle), [postTitle])

  useEffect(() => {
    tlAnimationRef.current = initAnimation()

    return () => {
      tlAnimationRef.current.kill()
    }
  }, [initAnimation])

  return (
    <DeletePostModal
      decodedTitle={decodedTitle}
      overlayRef={overlayRef as RefObject<HTMLDivElement>}
      absoluteRef={absoluteRef as RefObject<HTMLDivElement>}
      handleCloseDelete={handleCloseDelete}
      handleDeletePost={handleDeletePost} />
  )
}

export default DeletePostModalContainer