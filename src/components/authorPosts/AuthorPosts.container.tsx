import { FC } from "react";
import AuthorPosts from "./AuthorPosts";
import { AuthorPostsDataType } from "../../../pages/[...profile-path]";

const AuthorPostsContainer: FC<AuthorPostsDataType> = ({ list }) => {
  return (
    <AuthorPosts list={list} />
  )
}

export default AuthorPostsContainer