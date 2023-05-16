import { PostStyled } from "./Post.styled";
import PostDisplayContainer from "../postDisplay";
import EditPost from "../editPost/EditPost.container";
import DeletePostModalContainer from '../deletePostModal'

import type { FC } from "react";
import type { PostProps } from "./Post.type";

const Post: FC<PostProps> = ({
  handleTriggerEditView,
  isEditView,
  isDeleteView,
  updateOriginalPost,
  formMessage,
  handleTriggerDeleteView
}) => (
  <PostStyled>
    <PostDisplayContainer
      handleTriggerEditView={handleTriggerEditView}
      handleTriggerDeleteView={handleTriggerDeleteView}
      formMessage={formMessage} />
    {isEditView && (
      <EditPost
        handleTriggerEditView={handleTriggerEditView}
        updateOriginalPost={updateOriginalPost} />
    )}
    {isDeleteView && (
      <DeletePostModalContainer handleTriggerDeleteView={handleTriggerDeleteView} />
    )}
  </PostStyled>
)

export default Post