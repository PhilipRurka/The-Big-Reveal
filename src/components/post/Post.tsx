import { FC } from "react";
import { PostDataType } from "../../../pages/post/[...post-id]";
import { PostWrapper } from "./Post.styled";
import dayjs from "dayjs";

const Post: FC<PostDataType> = ({
  publicData,
  privateData
}) => {
  return (
    <PostWrapper>
      <h1>{ publicData.post_title }</h1>
      <h2>{ publicData.post_subtitle }</h2>
      <span>{ dayjs(publicData.created_at).format('D MMM YYYY, h:ss a') }</span>
      {publicData.post_content && (
        <>
          <h3>Public</h3>
          <p>{ publicData.post_content }</p>
        </>
      )}
      {privateData.post_content && (
        <>
          <h3>Private</h3>
          <p>{ privateData.post_content }</p>
        </>
      )}
    </PostWrapper>
  )
}

export default Post