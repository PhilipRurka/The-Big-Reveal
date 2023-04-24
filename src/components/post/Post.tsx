import { FC } from "react";
import {
  PostWrapper
} from "./Post.styled";
import PostDisplay from "../postDisplay";

export type PostType = {
  profile_path: string
  author_username: string | null
  created_at: string | null
  cleanBase: string
  cleanDescription: string
}

const Post: FC<PostType> = ({
  profile_path,
  author_username,
  created_at,
  cleanBase,
  cleanDescription
}) => (
  <PostWrapper>
    <PostDisplay
      profile_path={profile_path}
      author_username={author_username}
      created_at={created_at}
      cleanBase={cleanBase}
      cleanDescription={cleanDescription} />
  </PostWrapper>
)

export default Post