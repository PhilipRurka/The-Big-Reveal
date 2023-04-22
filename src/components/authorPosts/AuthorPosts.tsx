import { FC } from "react";
import {
  AuthorPostsWrapper,
  Title,
} from "./AuthorPosts.styled";
import { AuthorPostsDataType } from "../../../pages/[...profile-path]";
import PostCardList from "../postCardList";

const AuthorPosts: FC<AuthorPostsDataType> = ({ list }) => {
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