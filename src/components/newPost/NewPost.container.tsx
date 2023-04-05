import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react"
import { InputOnChangeType } from "../input/Input"
import NewPost from "./NewPost"

const NewPostContainer = () => {

  const [titleValue, setTitleValue] = useState('')
  const [subtitleValue, setSubitleValue] = useState('')
  const [publicValue, setPublicValue] = useState('')
  const [followValue, setFollowValue] = useState('')
  const [privateValue, setPrivateValue] = useState('')
  
  const handleTitleUpdate = useCallback((event: InputOnChangeType): void => {
    setTitleValue(event.currentTarget.value)
  }, [])

  const handleSubtitleUpdate = useCallback((event: InputOnChangeType): void => {
    setSubitleValue(event.currentTarget.value)
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

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <NewPost
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