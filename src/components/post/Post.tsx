import { FC } from "react";
import {
  PostWrapper
} from "./Post.styled";
import PostDisplay from "../postDisplay";

export type PostType = {
  author_username: string | null
  created_at: string | null
  cleanBase: string
  cleanDescription?: string
}

const Post: FC<PostType> = ({
  author_username,
  created_at,
  cleanBase,
  cleanDescription
}) => (
  <PostWrapper>
    <PostDisplay
      author_username={author_username}
      created_at={created_at}
      cleanBase={cleanBase}
      cleanDescription={cleanDescription} />
  </PostWrapper>
)

export default Post