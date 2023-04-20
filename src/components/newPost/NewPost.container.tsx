import { FormEvent, MutableRefObject, useCallback, useRef, useState } from "react"
import NewPost from "./NewPost"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "../../types/supabase-types"
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_toaster } from "../../redux/slices/toasterSlice"
import { Editor } from "tinymce"
import Router from "next/router"
import { StatusMessageTypesEnum } from "../authResMessage/FormMessage.container";

const NewPostContainer = () => {
  const mountedRef = useRef(true)
  const baseRef = useRef<Editor>()
  const descriptionRef = useRef<Editor>()

  const [errorMessage, setErrorMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const dispatch = useAppDispatch()
  const supabaseClient = useSupabaseClient<Database>()

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

    const publicId = uuidv4()
    const postBaseContent = baseRef.current.getContent()
    const postDescriptionContent = descriptionRef.current?.getContent() || null

    let title: string | string[] = postBaseContent.split('<h1')
    if(title.length === 1 ) {
      triggerErrorMessage('Your poem requires a "Heading 1"')
      return

    } else if(title.length > 2) {
      triggerErrorMessage('You can onlt have one "Heading 1"')
      return
    }

    title = title[1]
    title = title.split('</h1>')[0]
    title = title.replaceAll('>', '')
    title = title.replaceAll(/<h1 [A-Za-z0-9]+="[^"]*">/g, '')
    title = title.replaceAll(/<span [A-Za-z0-9]+="[^"]*">/g, '').replaceAll('</span>', '')
    title = title.replaceAll('<strong>', '').replaceAll('</strong>', '')
    title = title.replaceAll('<em>', '').replaceAll('</em>', '')

    const { data, error: baseError } = await supabaseClient
      .from('post_base')
      .insert([{
        id: publicId,
        post_title: title,
        tags: null,
        enable_reveal_date: null,
        enable_reveal: null,
        allow_published_at: null,
        written_at: null,
        is_published: false,
        post_content: postBaseContent
      }])
      .select('id')

    if(!data || baseError) {
      triggerErrorMessage('Something went wrong on the server side of things. Try again!')
      return
    }

    if(!mountedRef) return

    const { data: _, error: descriptionError } = await supabaseClient
      .from('post_description')
      .insert([{
        id: uuidv4(), 
        post_id: data[0].id,
        post_content: postDescriptionContent
      }])

    if(descriptionError) {
      setErrorMessage('Something went wrong on the server side of things. Try again!')
      setShowMessage(true)
      return
    }

    if(!mountedRef) return

    dispatch(update_toaster({
      title: 'New post',
      subtitle: 'Click here to view it.',
      to: `/post/${publicId}`
    }))

    baseRef.current.setContent('')
    descriptionRef.current?.setContent('')
    
    setShowMessage(false)
    setTimeout(() => {
      setErrorMessage('')
    }, 300)


    return () => {
      mountedRef.current = false
    }
  }, [dispatch, supabaseClient])

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