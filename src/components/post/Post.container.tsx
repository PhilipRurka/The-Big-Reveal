import { FC, useCallback, useRef, useState } from "react";
import { PostPageType } from "../../pages/post/[post-id]";
import { UpdateOriginalPostType } from "../editPost/EditPost.container";
import { FormMessageContainerType, StatusMessageTypesEnum } from "../formMessage/FormMessage.container";
import Post from "./Post";

export type UpdateOriginalPostFunctionType = (updatedData: UpdateOriginalPostType) => void

export type PostStateType = {
  baseContent: string
  descriptionContent: string
}

const PostContainer: FC<PostPageType> = ({
    post: postProp,
    ...args
}) => {
  const { current: isWindowDefined } = useRef(typeof window !== undefined)

  const [post, setPost] = useState<PostStateType>(postProp)
  const [isEditView, setIsEditView] = useState<boolean>(false)
  const [isDeleteView, setIsDeleteView] = useState<boolean>(false)
  const [formMessage, setFormMessage] = useState<FormMessageContainerType>({
    message: '',
    showMessage: false,
    type: undefined
  })

  const handleTriggerDeleteView = useCallback(() => {
    setIsDeleteView(!isDeleteView)
  }, [isDeleteView])
  
  const handleTriggerEditView = useCallback(() => {
    setIsEditView(!isEditView)
  }, [isEditView])

  const updateOriginalPost: UpdateOriginalPostFunctionType = useCallback((updatedData) => {
    setPost(updatedData)

    setFormMessage({
      message:'You have updated this post!',
      type: StatusMessageTypesEnum.SUCCESS,
      showMessage: true
    })

    if(!isWindowDefined) return
    const body = document.querySelector('body') as HTMLBodyElement
    body.style.overflow = 'unset'
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [isWindowDefined])

  return (
    <Post
      {...args}
      post={post}
      isEditView={isEditView}
      isDeleteView={isDeleteView}
      handleTriggerEditView={handleTriggerEditView}
      updateOriginalPost={updateOriginalPost}
      handleTriggerDeleteView={handleTriggerDeleteView}
      formMessage={formMessage} />
  )
}

export default PostContainer