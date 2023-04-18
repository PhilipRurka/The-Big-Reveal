import { FC } from "react"
import PostDisplay from "./PostDisplay"

export type PostDisplayType = {
  title: string
  poem: string
}

type PostDisplayContainerType = {
  post: PostDisplayType
}

const PostDisplayContainer: FC<PostDisplayContainerType> = ({
  post: {
    title,
    poem
  }
}) => {
  return (
    <PostDisplay
      title={title}
      poem={poem} />
  )
}

export default PostDisplayContainer