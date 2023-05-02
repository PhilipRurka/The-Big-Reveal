import { FC } from "react";
import {
  PostStyled
} from "./Post.styled";
import PostDisplay from "../postDisplay";
import { PostDataType } from "../../pages/post/[post-id]";

const Post: FC<PostDataType> = ({
  username,
    profilePath,
    baseContent,
    descriptionContent,
    created_at
}) => (
  <PostStyled>
    <PostDisplay
      username={username}
      profilePath={profilePath}
      baseContent={baseContent}
      descriptionContent={descriptionContent}
      created_at={created_at} />
  </PostStyled>
)

export default Post