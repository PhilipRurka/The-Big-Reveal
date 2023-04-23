import { FC } from "react"
import PostCardList from "./PostCardList"

export type PostCardListType = {
  list: Array<{
    id: string;
    created_at: string | null;
    author_username: string | null;
    post_title: string;
  }>
}

const PostCardListContainer: FC<PostCardListType> = ({
  list
}) => {
  return (
    <PostCardList list={list} />
  )
}

export default PostCardListContainer