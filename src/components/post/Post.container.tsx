import { FC } from "react";
import { PostDataType } from "../../pages/post/[post-id]";
import Post from "./Post";

const PostContainer: FC<PostDataType> = ({
    username,
    profilePath,
    baseContent,
    descriptionContent,
    created_at
}) => {

  return (
    <Post
      username={username}
      profilePath={profilePath}
      baseContent={baseContent}
      descriptionContent={descriptionContent}
      created_at={created_at} />
  )
}

export default PostContainer