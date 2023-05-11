import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../src/types/supabase.type'
import {
  UpdatePostBodyType,
  formatTitle,
  postErrorMessages
} from './post.utils'
import {
  generalErrorMessages,
  handleError
} from '../generalErrors';

export const updatePost = async (id: string, req: NextApiRequest, res: NextApiResponse) => {
  const {
    baseContent,
    descriptionContent
  } = req.body as UpdatePostBodyType

  const { unauthorized } = generalErrorMessages

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)
  }
  
  let postTitle = formatTitle(baseContent) as string

  const {
    data,
    error: resError
  } = await supabase.rpc('update_base_and_description', {
    post_id_val: id,
    post_title_val: postTitle,
    base_content_val: baseContent,
    description_content_val: descriptionContent || ''
  })

  if(resError) {
    const error = handleError(postErrorMessages, resError.message)

    return res.status(error.status).send({
      ...error,
      dataError: { resError }
    })
  }

  return res.status(200).send({
    baseContent: data[0].base_content,
    descriptionContent: data[0].description_content
  })
}