import { ChangeEvent, FormEvent, useCallback, useMemo, useRef, useState } from "react"
import { InputOnChangeType } from "../input/Input"
import NewPost from "./NewPost"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "../../types/supabase-types"
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_toaster } from "../../redux/slices/toasterSlice"

const NewPostContainer = () => {
  const mountedRef = useRef(true)

  const [titleValue, setTitleValue] = useState('')
  const [subtitleValue, setSubtitleValue] = useState('')
  const [publicValue, setPublicValue] = useState('')
  const [followValue, setFollowValue] = useState('')
  const [privateValue, setPrivateValue] = useState('')

  const dispatch = useAppDispatch()
  const supabaseClient = useSupabaseClient<Database>()
  
  const handleTitleUpdate = useCallback((event: InputOnChangeType): void => {
    setTitleValue(event.currentTarget.value)
  }, [])

  const handleSubtitleUpdate = useCallback((event: InputOnChangeType): void => {
    setSubtitleValue(event.currentTarget.value)
  }, [])

  const handlePublicUpdate = useCallback((event: ChangeEvent<HTMLTextAreaElement>): void => {
    setPublicValue(event.currentTarget.value)
  }, [])

  const handleFollowUpdate = useCallback((event: ChangeEvent<HTMLTextAreaElement>): void => {
    setFollowValue(event.currentTarget.value)
  }, [])

  const handlepPrivateUpdate = useCallback((event: ChangeEvent<HTMLTextAreaElement>): void => {
    setPrivateValue(event.currentTarget.value)
  }, [])

  const isDisabled = useMemo(() => {
    if(!titleValue || !subtitleValue) {
      return true
    }

    if(!(publicValue || followValue || privateValue)) {
      return true
    }

    return false
  }, [titleValue, subtitleValue, publicValue, followValue, privateValue])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    const { data, error: publicError } = await supabaseClient
      .from('public posts')
      .insert([{
        id: uuidv4(),
        post_title: titleValue,
        post_subtitle: subtitleValue,
        post_content: publicValue
      }])
      .select()

    if(!data || publicError) {
      // Some error
      return
    }

    if(!mountedRef) return

    const { data: _, error: privateError } = await supabaseClient
      .from('private posts')
      .insert([{
        id: uuidv4(),
        post_id: data[0].id,
        post_content: privateValue
      }])

    if(privateError) {
      // Do something
      return
    }

    if(!mountedRef) return

    setTitleValue('')
    setSubtitleValue('')
    setPublicValue('')
    setFollowValue('')
    setPrivateValue('')

    dispatch(update_toaster({
      title: 'New post',
      subtitle: 'Click here to view it.',
      to: 'https://google.com'
    }))

    return () => {
      mountedRef.current = false
    }
  }, [titleValue, subtitleValue, publicValue, privateValue, dispatch, supabaseClient])

  return (
    <NewPost
      titleValue={titleValue}
      subtitleValue={subtitleValue}
      publicValue={publicValue}
      followValue={followValue}
      privateValue={privateValue}
      handleTitleUpdate={handleTitleUpdate}
      handleSubtitleUpdate={handleSubtitleUpdate}
      handlePublicUpdate={handlePublicUpdate}
      handleFollowUpdate={handleFollowUpdate}
      handlepPrivateUpdate={handlepPrivateUpdate}
      isDisabled={isDisabled}
      handleSubmit={handleSubmit} />
  )
}

export default NewPostContainer