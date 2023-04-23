import { FC } from "react"
import PostCard from "./PostCard"

export type PostCardType = {
  id: string
  date: string | null
  username: string | null
  title: string
}

const PostCardContainer: FC<PostCardType> = ({
  id,
  date,
  username,
  title
}) => {
  return (
    <PostCard
      id={id}
      date={date}
      username={username}
      title={title} />
  )
}

export default PostCardContainer