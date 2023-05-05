import { FC } from "react";
import {
  PostStyled
} from "./Post.styled";
import PostDisplayContainer from "../postDisplay";
import EditPost from "../editPost/EditPost.container";
import { PostPageType } from "../../pages/post/[post-id]";
import { UpdateOriginalPostFunctionType } from "./Post.container";
import { FormMessageContainerType } from "../formMessage1/FormMessage.container";

type PostType = PostPageType & {
  isEditView: boolean
  updateOriginalPost: UpdateOriginalPostFunctionType
  handleTriggerEditView: () => void
  formMessage?: FormMessageContainerType
}

const Post: FC<PostType> = ({
  username,
  profilePath,
  post,
  created_at,
  isAuthor,
  handleTriggerEditView,
  isEditView,
  updateOriginalPost,
  postId,
  formMessage
}) => (
  <PostStyled>
    <PostDisplayContainer
      username={username}
      profilePath={profilePath}
      post={post}
      created_at={created_at}
      isAuthor={isAuthor}
      handleTriggerEditView={handleTriggerEditView}
      formMessage={formMessage} />
    {isEditView && (
      <EditPost
        post={post}
        handleTriggerEditView={handleTriggerEditView}
        updateOriginalPost={updateOriginalPost}
        postId={postId} />
    )}
  </PostStyled>
)

export default Post