import { FormEvent, MutableRefObject, useCallback, useRef, useState } from "react"
import { InputOnChangeType } from "../input/Input"
import NewPost from "./NewPost"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "../../types/supabase-types"
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_toaster } from "../../redux/slices/toasterSlice"
import { Editor } from "tinymce"
import Router from "next/router"

const NewPostContainer = () => {
  const mountedRef = useRef(true)
  const poemRef = useRef<Editor>()
  const descriptionRef = useRef<Editor>()

  const dispatch = useAppDispatch()
  const supabaseClient = useSupabaseClient<Database>()

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if(!poemRef.current) {
      console.log('Missing Poem!!')
      return
    }

    const publicId = uuidv4()
    const postBaseContent = poemRef.current.getContent()
    const postDescriptionContent = descriptionRef.current?.getContent() || null

    let title = postBaseContent.split('</h1>')[0]
    title = title.replaceAll('<h1>', '')
    title = title.replaceAll(/<h1 [A-Za-z0-9]+="[^"]*">/g, '')
    title = title.replaceAll(/<span [A-Za-z0-9]+="[^"]*">/g, '').replaceAll('</span>', '')
    title = title.replaceAll('<strong>', '').replaceAll('</strong>', '')
    title = title.replaceAll('<em>', '').replaceAll('</em>', '')

    const { data, error: publicError } = await supabaseClient
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
      .select()

    if(!data || publicError) {
      // Some error
      return
    }

    if(!mountedRef) return

    const { data: _, error: privateError } = await supabaseClient
      .from('post_description')
      .insert([{
        id: uuidv4(), 
        post_id: data[0].id,
        post_content: postDescriptionContent
      }])

    if(privateError) {
      // Do something
      return
    }

    if(!mountedRef) return

    dispatch(update_toaster({
      title: 'New post',
      subtitle: 'Click here to view it.',
      to: `/post/${publicId}`
    }))

    Router.push('feed/reflection')

    return () => {
      mountedRef.current = false
    }
  }, [dispatch, supabaseClient])

  return (
    <NewPost
      poemRef={poemRef as MutableRefObject<Editor>}
      descriptionRef={descriptionRef as MutableRefObject<Editor>}
      handleSubmit={handleSubmit} />
  )
}

export default NewPostContainer