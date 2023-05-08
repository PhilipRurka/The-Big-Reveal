import { FC, FormEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import NewPost from "./NewPost"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_toaster } from "../../redux/slices/toasterSlice"
import { Editor } from "tinymce"
import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container";
import axios from "axios"

const NewPostContainer: FC = () => {
  const mountedRef = useRef(true)
  const baseRef = useRef<Editor>()
  const descriptionRef = useRef<Editor>()

  const [errorMessage, setErrorMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const dispatch = useAppDispatch()

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

    const baseContent = baseRef.current.getContent()
    const descriptionContent = descriptionRef.current?.getContent() || null

    axios.put('/api/post', {
      baseContent,
      descriptionContent
    })
    .then(({ data: { id }}) => {
      if(!mountedRef.current) return

      dispatch(update_toaster({
        title: 'New post',
        subtitle: 'Click here to view it.',
        to: `/post/${id}`
      }))

      baseRef.current?.setContent('')
      descriptionRef.current?.setContent('')

      setShowMessage(false)
      setTimeout(() => {
        setErrorMessage('')
      }, 300)
    })
    .catch(({ response: { data: { message }}}) => {
      triggerErrorMessage(message)
    })
  }, [dispatch])

  useEffect(() => {
    mountedRef.current = true
    
    return () => {
      mountedRef.current = false
    }
  }, [])

  return (
    <NewPost
      baseRef={baseRef as MutableRefObject<Editor>}
      descriptionRef={descriptionRef as MutableRefObject<Editor>}
      handleSubmit={handleSubmit}
      formMessageProps={{
        message: errorMessage,
        showMessage,
        type: StatusMessageTypesEnum.ERROR
      }} />
  )
}

export default NewPostContainer