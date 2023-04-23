import { FC } from "react";
import {
  AuthorPostsWrapper,
  Title,
} from "./AuthorPosts.styled";
import PostCardList from "../postCardList";
import { FeedListPropsType } from "../feed/Feed";

const AuthorPosts: FC<FeedListPropsType> = ({ list }) => {
  return (
    <AuthorPostsWrapper>
      <Title>
        {`${ list[0].author_username }'s collection`}
      </Title>
      <PostCardList list={list} />
    </AuthorPostsWrapper>
  )
}

export default AuthorPosts