import { useCallback, useEffect, useRef, useState } from "react";
import { StatusMessageTypesEnum } from "../formMessage/FormMessage.container";
import Post from "./Post";
import { init_post } from "../../redux/slices/postSlice";
import { useAppDispatch } from "../../redux/redux_hooks";

import type { FC } from 'react'
import type { FormMessageContainerType } from "../formMessage/FormMessage.container";
import type {
  PostContainerProps,
  UpdateOriginalPostFunction
} from "./Post.type";

const PostContainer: FC<PostContainerProps> = (props) => {
  const [isEditView, setIsEditView] = useState<boolean>(false)
  const [isDeleteView, setIsDeleteView] = useState<boolean>(false)
  const [formMessage, setFormMessage] = useState<FormMessageContainerType>({
    message: '',
    showMessage: false,
    type: undefined
  })

  const dispatch = useAppDispatch()

  const handleTriggerDeleteView = useCallback(() => {
    setIsDeleteView(!isDeleteView)
  }, [isDeleteView])
  
  const handleTriggerEditView = useCallback(() => {
    setIsEditView(!isEditView)
  }, [isEditView])

  const updateOriginalPost: UpdateOriginalPostFunction = useCallback((updatedData) => {
    setFormMessage({
      message:'You have updated this post!',
      type: StatusMessageTypesEnum.SUCCESS,
      showMessage: true
    })
  }, [])

  useEffect(() => {
    dispatch(init_post(props))
  }, [dispatch, props])

  return (
    <Post
      isEditView={isEditView}
      isDeleteView={isDeleteView}
      handleTriggerEditView={handleTriggerEditView}
      updateOriginalPost={updateOriginalPost}
      handleTriggerDeleteView={handleTriggerDeleteView}
      formMessage={formMessage} />
  )
}

export default PostContainer