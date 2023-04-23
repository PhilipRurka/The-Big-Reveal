import { FC, useCallback, useEffect, useState } from "react";
import Feed from "./Feed";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../types/supabase-types";

export type FeedListType = Array<{
  id: string
  created_at: string | null;
  post_title: string
  author_username: string | null;
}>

const FeedContainer: FC = () => {
  const [feedList, setFeedList] = useState<FeedListType>([])

  const supabaseClient = useSupabaseClient<Database>()

  const getinitialData = useCallback(async () => {
    const {
      data: listData,
      error
    } = await supabaseClient
      .from("post_base")
      .select('id, created_at, post_title, author_username')
      .order("created_at", { ascending: false })

    if(!listData || error) return

      setFeedList(listData)
  }, [supabaseClient])

  useEffect(() => {
    getinitialData()
  }, [getinitialData])

  return (
    <Feed list={feedList} />
  )
}

export default FeedContainer