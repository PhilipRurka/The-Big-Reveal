import { FC } from "react";
import {
  PostStyled
} from "./Post.styled";
import PostDisplay from "../postDisplay";

export type PostType = {
  profilePath?: string
  username?: string | null
  created_at?: string | null
  cleanBase: string
  cleanDescription: string
}

const Post: FC<PostType> = ({
  profilePath,
  username,
  created_at,
  cleanBase,
  cleanDescription
}) => (
  <PostStyled>
    <PostDisplay
      profilePath={profilePath}
      username={username}
      created_at={created_at}
      cleanBase={cleanBase}
      cleanDescription={cleanDescription} />
  </PostStyled>
)

export default Post