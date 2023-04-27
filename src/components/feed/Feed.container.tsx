import { FC, useCallback, useEffect, useState } from "react";
import Feed from "./Feed";
import axios from "axios";
import { PostCardListType } from "../postCardList/PostCardList.container";

type GetDataType = {
  data: PostCardListType
}

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