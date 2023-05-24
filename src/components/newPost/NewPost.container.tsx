import { FC, FormEvent, MutableRefObject } from 'react'
import type { Editor } from "tinymce"

import { useCallback, useEffect, useRef } from "react"
import NewPost from "./NewPost"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_toaster } from "../../redux/slices/toasterSlice"
import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container";
import axios from "axios"
import {
  close_formMessage,
  update_formMessage
} from "../../redux/slices/formMessageSlice"

const NewPostContainer: FC = () => {
  const mountedRef = useRef(true)
  const baseRef = useRef<Editor>()
  const descriptionRef = useRef<Editor>()

  const dispatch = useAppDispatch()

  const triggerErrorMessage = useCallback((message: string) => {
    dispatch(update_formMessage({
      id: 'newPostFormMessage',
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

      dispatch(close_formMessage({
        id: 'newPostFormMessage'
      }))
    })
    .catch(({ response: { data: { message }}}) => {
      triggerErrorMessage(message)
    })
  }, [dispatch, triggerErrorMessage])

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
      handleSubmit={handleSubmit} />
  )
}

export default NewPostContainer