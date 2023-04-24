import { FC } from "react";
import {
  Author,
  Date,
  PostCardWrapper,
  Title
} from "./PostCard.styled";
import { PostCardType } from "./PostCard.container";
import dayjs from "dayjs";

const PostCard: FC<PostCardType> = ({
  id,
  date,
  username,
  title,
}) => {
  return (
    <PostCardWrapper href={`/post/${id}`} >
      <Title dangerouslySetInnerHTML={{ __html: `<span>${title}</span>` }} />
      <Author>
        { username }
      </Author>
      <Date>
        { date }
      </Date>
    </PostCardWrapper>
  )
}

export default PostCard