import { FC } from "react"
import PostCardList from "./PostCardList"
import { AuthorPostsDataType } from "../../../pages/[...profile-path]"

const PostCardListContainer: FC<AuthorPostsDataType> = ({
  list
}) => {
  return (
    <PostCardList list={list} />
  )
}

export default PostCardListContainer