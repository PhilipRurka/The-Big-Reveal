import { FC } from "react";
import {
  AuthorPostsWrapper,
  Title,
} from "./AuthorPosts.styled";
import PostCardList from "../postCardList";
import { UserSpaceDataType } from "../../../pages/[...profile-path]";

const AuthorPosts: FC<UserSpaceDataType> = ({
  list,
  username,
  host
}) => {
  return (
    <AuthorPostsWrapper>
      <Title>
        {`${ username }'s collection`}
      </Title>
      <PostCardList list={list} />
    </AuthorPostsWrapper>
  )
}

export default AuthorPosts