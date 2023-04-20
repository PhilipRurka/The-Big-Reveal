import { FC } from "react";
import { PostDataType } from "../../../pages/post/[...post-id]";
import Post from "./Post";

const PostContainer: FC<PostDataType> = ({
  postBase: {
    post_content: baseContent,
    ...postBaseProps
  },
  postDescription: {
    post_content: descriptionContent
  }
}) => {

  return (
    <Post
      {...postBaseProps}
      cleanBase={baseContent}
      cleanDescription={descriptionContent} />
  )
}

export default PostContainer