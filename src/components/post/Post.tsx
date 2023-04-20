import { FC } from "react";
import {
  PostWrapper,
  Date
} from "./Post.styled";
import dayjs from "dayjs";
import CleanContent from "../cleanContent";

type PostType = {
  id: string
  created_at: string | null
  cleanBase: string
  cleanDescription: string
}

const Post: FC<PostType> = ({
  id,
  created_at,
  cleanBase,
  cleanDescription
}) => {
  return (
    <PostWrapper>
      <Date>
        { dayjs(created_at).format('D MMM YYYY, h:ss a') }
      </Date>
        <h3>Post Base</h3>
        <CleanContent content={cleanBase}/>
      {cleanDescription && (
        <>
          <h3>Post Description</h3>
          <CleanContent content={cleanDescription}/>
        </>
      )}
    </PostWrapper>
  )
}

export default Post