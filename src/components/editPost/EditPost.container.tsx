import axios from "axios"
import { FC, FormEvent, MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
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

  const [errorMessage, setErrorMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const initialAnimation = useCallback(() => {
    return gsap.timeline().fromTo('#edit-overlay', {
      alpha: 0
    }, {
      alpha: 1,
      duration: 0.5,
      ease: "power1.inOut"
    })
    .fromTo('#edit-absolute', {
      x: (_, element: HTMLDivElement) => element.getBoundingClientRect().width
    }, {
      x: 0,
      duration: 0.5,
      ease: "power1.out"
    }, "-=50%")
  }, [])

  useEffect(() => {
    initialAnimationRef.current = initialAnimation()

    return () => {
      initialAnimationRef?.current?.kill()
    }
  }, [initialAnimation])

  useEffect(() => {
    mountedRef.current = true
    const body = document.querySelector('body') as HTMLBodyElement
    body.style.overflow = 'hidden'

    return () => {
      mountedRef.current = false
      body.style.overflow = 'unset'
    }
  }, [])

  const handleCloseEdit = useCallback(() => {
    initialAnimationRef.current.reverse()
    setTimeout(() => {
      handleTriggerEditView()
    }, 750)
  }, [])

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
      }} />
  )
}

export default EditPostContainer