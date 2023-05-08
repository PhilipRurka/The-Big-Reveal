import { FC, useEffect, useState } from "react"
import PostCard from "./PostCard"
import dayjs from "dayjs"

export type PostCardType = {
  id: string
  date: string | null
  username: string | null
  title: string
}

const PostCardContainer: FC<PostCardType> = ({
  date: rawDate,
  ...args
}) => {
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(dayjs(rawDate).format('D MMM YYYY, h:ss a'))
  }, [rawDate])

  return (
    <PostCard
      {...args}
      date={date} />
  )
}

export default PostCardContainer