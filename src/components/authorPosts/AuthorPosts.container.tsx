import axios from "axios";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { GetDataType } from "../../../lib/feedAPI/get/feed.get";
import { UserSpaceDataType } from "../../pages/[collection]";
import { PostCardListType } from "../postCardList/PostCardList.container";
import AuthorPosts from "./AuthorPosts";

const AuthorPostsContainer: FC<UserSpaceDataType> = ({
  host,
  profile_path,
  username
}) => {
  const mountedRef = useRef(true)

  const [feedList, setFeedList] = useState<PostCardListType>([])

  const updatePostList = useCallback(() => {
    axios.get(`/api/feed/${profile_path}`)
    .then(({ data }: GetDataType) => {
      if(!mountedRef.current) return
      
      setFeedList(data)
    })
    .catch(() => {
      return
    })
  }, [profile_path])

  useEffect(() => {
    mountedRef.current = true
    updatePostList()

    return () => {
      mountedRef.current = false
    }
  }, [updatePostList])

  return (
    <AuthorPosts
      list={feedList}
      profile_path={profile_path}
      username={username}
      host={host} />
  )
}

export default AuthorPostsContainer