import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../src/types/supabase-types'
import {
  generalErrorMessages,
  handleError
} from '../generalErrors';
import { postErrorMessages } from './utils';

export const deletePost = async (id: string, req: NextApiRequest, res: NextApiResponse) => {

  const { unauthorized } = generalErrorMessages

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)
  }

  const {
    error: resError
  } = await supabase.rpc('delete_base_and_description', { post_id_val: id })

  if(resError) {
    const error = handleError(postErrorMessages, resError.message)

    return res.status(error.status).send({
      ...error,
      dataError: { resError }
    })
  }

  return res.status(200).send({})
}