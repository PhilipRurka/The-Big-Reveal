import { FC, useCallback, useState } from "react";
import { PostPageType } from "../../pages/post/[post-id]";
import { UpdateOriginalPostType } from "../editPost/EditPost.container";
import Post from "./Post";

export type UpdateOriginalPostFunctionType = (updatedData: UpdateOriginalPostType) => void

export type PostStateType = {
  baseContent: string
  descriptionContent: string
}

const PostContainer: FC<PostPageType> = ({
    username,
    profilePath,
    post: postProp,
    created_at,
    isAuthor,
    postId
}) => {
  const [post, setPost] = useState<PostStateType>(postProp)
  const [isEditView, setIsEditView] = useState<boolean>(false)

  const handleTriggerEditView = useCallback(() => {
    setIsEditView(!isEditView)
    // Get version of edited post
  }, [isEditView])

  const updateOriginalPost: UpdateOriginalPostFunctionType = useCallback((updatedData) => {
    console.log(updatedData)
    setPost(updatedData)
  }, [])

  return (
    <Post
      username={username}
      profilePath={profilePath}
      post={post}
      created_at={created_at}
      isEditView={isEditView}
      isAuthor={isAuthor}
      handleTriggerEditView={handleTriggerEditView}
      updateOriginalPost={updateOriginalPost}
      postId={postId} />
  )
}

export default PostContainer