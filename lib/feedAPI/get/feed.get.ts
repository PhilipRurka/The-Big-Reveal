import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../src/types/supabase-types";
import { generalErrorMessages } from "../../generalErrors";

export const selectFeed = async (req: NextApiRequest, res: NextApiResponse) => {
  const { unauthorized } = generalErrorMessages

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  /** Start Error Block */
  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)
  }
  /** End Error Block */

  const {
    data,
    error
  } = await supabase
    .from("post_base")
    .select(`
      id,
      created_at,
      post_title,
      profiles!post_base_user_id_fkey (
        username
      )
    `)
    .order("created_at", { ascending: false })

  /** Start Error Block */
  // if(error) {
  //   return res.status(dataIssue.status).send({
  //     ...dataIssue,
  //     dataError: { error }
  //   })
  // }
  /** End Error Block */

  return res.status(200).send(data)
}