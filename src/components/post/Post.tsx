import { FC } from "react";
import {
  PostStyled
} from "./Post.styled";
import PostDisplay from "../postDisplay";
import EditPost from "../editPost/EditPost.container";
import { PostPageType } from "../../pages/post/[post-id]";

type PostType = PostPageType & {
  isEditView: boolean
  handleTriggerEditView: () => void
}

const Post: FC<PostType> = ({
  username,
  profilePath,
  baseContent,
  descriptionContent,
  created_at,
  isAuthor,
  handleTriggerEditView,
  isEditView,
  postId
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
        handleTriggerEditView={handleTriggerEditView}
        postId={postId} />
    )}
  </PostStyled>
)

export default Post