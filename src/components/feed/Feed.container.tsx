import { FC, useCallback, useEffect, useRef, useState } from "react";
import Feed from "./Feed";
import axios from "axios";
import { PostCardListType } from "../postCardList/PostCardList.container";
import { GetDataType } from "../../../lib/feedAPI/get/feed.get";

const FeedContainer: FC = () => {
  const mountedRef = useRef(true)

  const [feedList, setFeedList] = useState<PostCardListType>([])

  const updatePostList = useCallback(async () => {
    axios.get('/api/feed')
    .then(({ data }: GetDataType) => {
      if(!mountedRef.current) return

      setFeedList(data)
    })
    .catch(() => {
      return
    })
  }, [])

  useEffect(() => {
    mountedRef.current = true
    updatePostList()

    const timer = setInterval(() => {
      updatePostList()
    }, 60000)

    
    return () => {
      mountedRef.current = false
      clearInterval(timer)
    }
  }, [updatePostList])

  return (
    <Feed list={feedList} />
  )
}

export default FeedContainer