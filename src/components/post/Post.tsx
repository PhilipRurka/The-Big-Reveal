import { FC } from "react";
import {
  PostStyled
} from "./Post.styled";
import PostDisplay from "../postDisplay";
import EditPost from "../editPost/EditPost.container";
import { PostType } from "../../pages/post/[post-id]";

type PostPropsType = PostType & {
  isEditView: boolean
  isAuthor?: boolean
  handleTriggerEditView: () => void
}

const Post: FC<PostPropsType> = ({
  username,
  profilePath,
  baseContent,
  descriptionContent,
  created_at,
  isEditView,
  isAuthor,
  handleTriggerEditView
}) => (
  <PostStyled>
    <PostDisplay
      username={username}
      profilePath={profilePath}
      baseContent={baseContent}
      descriptionContent={descriptionContent}
      created_at={created_at}
      isAuthor={isAuthor}
      handleTriggerEditView={handleTriggerEditView} />
    {isEditView && (
      <EditPost
        baseContent={baseContent}
        descriptionContent={descriptionContent}
        handleTriggerEditView={handleTriggerEditView} />
    )}
  </PostStyled>
)

export default Post