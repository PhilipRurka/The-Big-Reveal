import { FormEvent, MutableRefObject, useCallback, useRef, useState } from "react"
import { InputOnChangeType } from "../input/Input"
import NewPost from "./NewPost"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "../../types/supabase-types"
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_toaster } from "../../redux/slices/toasterSlice"
import { Editor } from "tinymce"

const NewPostContainer = () => {
  const mountedRef = useRef(true)
  const poemRef = useRef<Editor>()

  const [titleValue, setTitleValue] = useState('')
  const [tagsValue, setTagsValue] = useState('')

  const dispatch = useAppDispatch()
  const supabaseClient = useSupabaseClient<Database>()
  
  const handleTitleUpdate = useCallback((event: InputOnChangeType): void => {
    setTitleValue(event.currentTarget.value)
  }, [])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if(!poemRef.current) {
      console.log('Missing Poem!!')
      return
    }

    const publicId = uuidv4()

    const { data, error: publicError } = await supabaseClient
      .from('post base')
      .insert([{
        id: publicId,
        post_title: titleValue,
        tags: null,
        enable_reveal_date: null,
        enable_reveal: null,
        allow_published_at: null,
        written_at: null,
        is_published: false,
        post_content: poemRef.current.getContent()
      }])
      .select()

    if(!data || publicError) {
      // Some error
      return
    }

    if(!mountedRef) return

    const { data: _, error: privateError } = await supabaseClient
      .from('post description')
      .insert([{
        id: uuidv4(),
        post_id: data[0].id,
        post_content: ''
      }])

    if(privateError) {
      // Do something
      return
    }

    if(!mountedRef) return

    setTitleValue('')
    setTagsValue('')

    dispatch(update_toaster({
      title: 'New post',
      subtitle: 'Click here to view it.',
      to: `/post/${publicId}`
    }))

    return () => {
      mountedRef.current = false
    }
  }, [titleValue, tagsValue, dispatch, supabaseClient])

  return (
    <NewPost
      poemRef={poemRef as MutableRefObject<Editor>}
      titleValue={titleValue}
      handleTitleUpdate={handleTitleUpdate}
      handleSubmit={handleSubmit} />
  )
}

export default NewPostContainer