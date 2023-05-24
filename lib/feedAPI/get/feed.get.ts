import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { PostCardListType } from "../../../src/components/postCardList/PostCardList.container";
import { Database } from "../../../src/types/supabase.type";
import { generalErrorMessages } from "../../generalErrors";

export type GetDataType = {
  data: PostCardListType
}

export const selectFeed = async (req: NextApiRequest, res: NextApiResponse) => {
  const { unauthorized } = generalErrorMessages

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)
  }

  const { data } = await supabase
    .from("post_base")
    .select(`
      base_id,
      created_at,
      post_title,
      profiles!post_base_user_id_fkey (
        username
      )
    `)
    .order("created_at", { ascending: false })

  return res.status(200).send(data)
}