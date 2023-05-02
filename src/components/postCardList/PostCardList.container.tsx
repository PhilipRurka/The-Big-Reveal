import { FC } from "react"
import PostCardList from "./PostCardList"

export type PostCardListType = Array<{
  base_id: string
  created_at: string | null
  post_title: string
  profiles: {
    username: string
  }
}> | []

export type PostCardListPropsType = {
  list: PostCardListType
}

const PostCardListContainer: FC<PostCardListPropsType> = ({
  list
}) => {
  return (
    <PostCardList list={list} />
  )
}

export default PostCardListContainer