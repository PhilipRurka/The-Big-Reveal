import { FC, useCallback, useEffect, useState } from "react";
import Feed from "./Feed";
import axios from "axios";
import { PostCardListType } from "../postCardList/PostCardList.container";
import { GetDataType } from "../../../lib/feedAPI/get/feed.get";

const FeedContainer: FC = () => {
  const [feedList, setFeedList] = useState<PostCardListType>([])

  const getinitialData = useCallback(async () => {
    axios.get('/api/feed')
    .then(({ data }: GetDataType) => {
      setFeedList(data)
    })
    .catch(() => {
      return
    })
  }, [])

  useEffect(() => {
    getinitialData()
  }, [getinitialData])

  return (
    <Feed list={feedList} />
  )
}

export default FeedContainer