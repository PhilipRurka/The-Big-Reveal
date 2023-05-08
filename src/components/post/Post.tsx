import { FC } from "react";
import { PostStyled } from "./Post.styled";
import PostDisplayContainer from "../postDisplay";
import EditPost from "../editPost/EditPost.container";
import { PostPageType } from "../../pages/post/[post-id]";
import { UpdateOriginalPostFunctionType } from "./Post.container";
import { FormMessageContainerType } from "../formMessage/FormMessage.container";
import DeletePostModalContainer from '../deletePostModal'

type PostType = PostPageType & {
  isEditView: boolean
  isDeleteView: boolean
  updateOriginalPost: UpdateOriginalPostFunctionType
  handleTriggerEditView: () => void
  formMessage?: FormMessageContainerType
  postTitle: string
  handleTriggerDeleteView: () => void
}

const Post: FC<PostType> = ({
  username,
  profilePath,
  post,
  createdAt,
  isAuthor,
  handleTriggerEditView,
  isEditView,
  isDeleteView,
  updateOriginalPost,
  postId,
  formMessage,
  postTitle,
  handleTriggerDeleteView
}) => (
  <PostStyled>
    <PostDisplayContainer
      username={username}
      profilePath={profilePath}
      post={post}
      createdAt={createdAt}
      isAuthor={isAuthor}
      handleTriggerEditView={handleTriggerEditView}
      handleTriggerDeleteView={handleTriggerDeleteView}
      formMessage={formMessage} />
    {isEditView && (
      <EditPost
        post={post}
        handleTriggerEditView={handleTriggerEditView}
        updateOriginalPost={updateOriginalPost}
        postId={postId} />
    )}
    {isDeleteView && (
      <DeletePostModalContainer
        postTitle={postTitle}
        handleTriggerDeleteView={handleTriggerDeleteView}
        postId={postId} />
    )}
  </PostStyled>
)

export default Post