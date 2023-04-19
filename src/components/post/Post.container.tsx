import { FC } from "react";
import { PostDataType } from "../../../pages/post/[...post-id]";
import Post from "./Post";

const PostContainer: FC<PostDataType> = ({
  postBase,
  postDescription
}) => {
  return (
    <Post
      postBase={postBase}
      postDescription={postDescription} />
  )
}

export default PostContainer