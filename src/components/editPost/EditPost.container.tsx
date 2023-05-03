import axios from "axios"
import { FC, FormEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import { Editor } from "tinymce"
import { StatusMessageTypesEnum } from "../FormMessage/FormMessage.container"
import EditPost from "./EditPost"

type EditPostType = {
  postId: string
  baseContent: string
  descriptionContent: string
  handleTriggerEditView: () => void
}

const EditPostContainer: FC<EditPostType> = ({
  postId,
  baseContent,
  descriptionContent,
  handleTriggerEditView
}) => {
  const mountedRef = useRef(true)
  const baseRef = useRef<Editor>()
  const descriptionRef = useRef<Editor>()

  const [errorMessage, setErrorMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.style.overflow = 'hidden'

    return () => {
      mountedRef.current = false
      body.style.overflow = 'unset'
    }
  }, [])

  const triggerErrorMessage = (message: string) => {
    setErrorMessage(message)
    setShowMessage(true)
  }

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if(!baseRef.current?.getContent()) {
      triggerErrorMessage('The "Drop that poem" section musn\'t be empty')
      return
    }

    const postBaseContent = baseRef.current.getContent()
    const postDescriptionContent = descriptionRef.current?.getContent() || null

    // axios.put('/api/post', {
    //   base: {
    //     base_content: postBaseContent,
    //   },
    //   description: {
    //     description_content: postDescriptionContent
    //   }
    // })
    // .then(() => {
    //   handleTriggerEditView()
    // })
    // .catch(({ response: { data: { message }}}) => {
    //   triggerErrorMessage(message)
    // })
  }, [])

  return (
    <EditPost
      handleTriggerEditView={handleTriggerEditView}
      baseRef={baseRef as MutableRefObject<Editor>}
      descriptionRef={descriptionRef as MutableRefObject<Editor>}
      baseContent={baseContent}
      descriptionContent={descriptionContent}
      handleSubmit={handleSubmit}
      formMessageProps={{
        message: errorMessage,
        showMessage,
        type: StatusMessageTypesEnum.ERROR
      }} />
  )
}

export default EditPostContainer