import { FC } from "react";
import { PostDataType } from "../../../pages/post/[...post-id]";
import Post from "./Post";

const PostContainer: FC<PostDataType> = ({
  publicData,
  privateData
}) => {
  return (
    <Post
      publicData={publicData}
      privateData={privateData} />
  )
}

export default PostContainer