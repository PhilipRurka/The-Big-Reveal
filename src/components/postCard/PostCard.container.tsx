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
  id,
  date: rawDate,
  username,
  title
}) => {
  const [date, setDate] = useState('')

  useEffect(() => {
    console.log(rawDate)
    setDate(dayjs(rawDate).format('D MMM YYYY, h:ss a'))
  }, [rawDate])

  return (
    <PostCard
      id={id}
      date={date}
      username={username}
      title={title} />
  )
}

export default PostCardContainer