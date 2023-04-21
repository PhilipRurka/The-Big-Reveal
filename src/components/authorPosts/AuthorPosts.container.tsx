import { FC } from "react";
import AuthorPosts from "./AuthorPosts";
import { AuthorPostsDataType } from "../../../pages/[...profile-path]";

const AuthorPostsContainer: FC<AuthorPostsDataType> = ({ cards }) => {
  return (
    <AuthorPosts cards={cards} />
  )
}

export default AuthorPostsContainer