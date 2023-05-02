import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { PostCardListType } from "../../../../src/components/postCardList/PostCardList.container";
import { Database } from "../../../../src/types/supabase-types";
import { generalErrorMessages } from "../../../generalErrors";

export type GetDataType = {
  data: PostCardListType
}

export const selectFeedUserId = async (
  req: NextApiRequest,
  res: NextApiResponse,
  profile_path: string
) => {
  const { unauthorized } = generalErrorMessages

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)
  }
  
  const {
    data,
    error
  } = await supabase.rpc('select_authors_posts', { profile_path })

  const formatedData = []

  for (let i = 0; i < data.length; i++) {
    const {
      base_id,
      created_at,
      post_title,
      username
    } = data[i];

    formatedData.push({
      base_id,
      created_at,
      post_title,
      profiles: {
        username  
      }
    })
    
  }

  return res.status(200).send(formatedData)
}