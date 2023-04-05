import { ChangeEvent, useCallback } from "react"
import { InputOnChangeType } from "../input/Input"
import NewPost from "./NewPost"

const NewPostContainer = () => {


  
  const handleTitleUpdate = useCallback((event: InputOnChangeType): void => {
    
  }, [])


  const handleSubtitleUpdate = useCallback((event: InputOnChangeType): void => {
    
  }, [])


  const handlePublicUpdate = useCallback((event: ChangeEvent<HTMLTextAreaElement>): void => {
    
  }, [])


  const handleFollowUpdate = useCallback((event: ChangeEvent<HTMLTextAreaElement>): void => {
    
  }, [])


  const handlepPrivateUpdate = useCallback((event: ChangeEvent<HTMLTextAreaElement>): void => {
    
  }, [])

  return (
    <NewPost
    handleTitleUpdate={handleTitleUpdate}
    handleSubtitleUpdate={handleSubtitleUpdate}
    handlePublicUpdate={handlePublicUpdate}
    handleFollowUpdate={handleFollowUpdate}
    handlepPrivateUpdate={handlepPrivateUpdate} />
  )
}

export default NewPostContainer