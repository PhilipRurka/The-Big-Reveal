import { FC } from "react";
import AuthorPosts from "./AuthorPosts";
import { UserSpaceDataType } from "../../../pages/[...profile-path]";

const AuthorPostsContainer: FC<UserSpaceDataType> = ({
  list,
  username,
  host
}) => {
  return (
    <AuthorPosts
      list={list}
      username={username}
      host={host} />
  )
}

export default AuthorPostsContainer