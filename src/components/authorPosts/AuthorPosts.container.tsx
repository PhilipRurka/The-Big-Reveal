import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { GetDataType } from "../../../lib/feedAPI/get/feed.get";
import { UserSpaceDataType } from "../../pages/[...profile-path]";
import { PostCardListType } from "../postCardList/PostCardList.container";
import AuthorPosts from "./AuthorPosts";

const AuthorPostsContainer: FC<UserSpaceDataType> = ({
  host,
  profile_path,
  username
}) => {
  const [feedList, setFeedList] = useState<PostCardListType>([])

  const updatePostList = useCallback(() => {
    axios.get(`/api/feed/${profile_path}`)
    .then(({ data }: GetDataType) => {
      setFeedList(data)
    })
    .catch(() => {
      return
    })
  }, [profile_path])

  useEffect(() => {
    updatePostList()
  }, [updatePostList])

  return (
    <AuthorPosts
      list={feedList}
      username={username}
      profile_path={profile_path}
      host={host} />
  )
}

export default AuthorPostsContainer