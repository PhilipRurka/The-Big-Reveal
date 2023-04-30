import { FC } from "react";
import {
  AuthorPostsStyled,
  Title,
} from "./AuthorPosts.styled";
import PostCardList from "../postCardList";
import { UserSpaceDataType } from "../../pages/[...profile-path]";

const AuthorPosts: FC<UserSpaceDataType> = ({
  list,
  username,
  host
}) => {
  return (
    <AuthorPostsStyled>
      <Title>
        {`${ username }'s collection`}
      </Title>
      <PostCardList list={list} />
    </AuthorPostsStyled>
  )
}

export default AuthorPosts