import type { FC } from 'react'
import type { PostContainerProps } from "./Post.type";

import { useCallback, useEffect, useState } from "react";
import Post from "./Post";
import { init_post } from "../../redux/slices/postSlice";
import { useAppDispatch } from "../../redux/redux_hooks";

const PostContainer: FC<PostContainerProps> = (props) => {
  const [isEditView, setIsEditView] = useState<boolean>(false)
  const [isDeleteView, setIsDeleteView] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const handleTriggerDeleteView = useCallback(() => {
    setIsDeleteView(!isDeleteView)
  }, [isDeleteView])
  
  const handleTriggerEditView = useCallback(() => {
    setIsEditView(!isEditView)
  }, [isEditView])

  useEffect(() => {
    dispatch(init_post(props))
  }, [dispatch, props])

  return (
    <Post
      isEditView={isEditView}
      isDeleteView={isDeleteView}
      handleTriggerEditView={handleTriggerEditView}
      handleTriggerDeleteView={handleTriggerDeleteView} />
  )
}

export default PostContainer