import { FC } from "react";
import AuthorPosts from "./AuthorPosts";
import { FeedListPropsType } from "../feed/Feed";

const AuthorPostsContainer: FC<FeedListPropsType> = ({ list }) => {
  return (
    <AuthorPosts list={list} />
  )
}

export default AuthorPostsContainer