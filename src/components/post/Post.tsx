import type { FC } from "react";
import type { PostProps } from "./Post.type";

import { PostStyled } from "./Post.styled";
import PostDisplayContainer from "../postDisplay";
import EditPost from "../editPost/EditPost.container";
import DeletePostModalContainer from '../deletePostModal'

const Post: FC<PostProps> = ({
  handleTriggerEditView,
  isEditView,
  isDeleteView,
  handleTriggerDeleteView
}) => (
  <PostStyled>
    <PostDisplayContainer
      handleTriggerEditView={handleTriggerEditView}
      handleTriggerDeleteView={handleTriggerDeleteView} />
    {isEditView && (
      <EditPost handleTriggerEditView={handleTriggerEditView} />
    )}
    {isDeleteView && (
      <DeletePostModalContainer handleTriggerDeleteView={handleTriggerDeleteView} />
    )}
  </PostStyled>
)

export default Post