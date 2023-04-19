import { FC } from "react";
import { PostDataType } from "../../../pages/post/[...post-id]";
import { PostWrapper } from "./Post.styled";
import dayjs from "dayjs";

const Post: FC<PostDataType> = ({
  postBase,
  postDescription
}) => {
  return (
    <PostWrapper>
      <span>{ dayjs(postBase.created_at).format('D MMM YYYY, h:ss a') }</span>
      {postBase.post_content && (
        <>
          <h3>Post Base</h3>
          <p>{ postBase.post_content }</p>
        </>
      )}
      {postDescription?.post_content && (
        <>
          <h3>Post Description</h3>
          <p>{ postDescription.post_content }</p>
        </>
      )}
    </PostWrapper>
  )
}

export default Post