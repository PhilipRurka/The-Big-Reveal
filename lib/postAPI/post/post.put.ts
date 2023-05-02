import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../src/types/supabase-types'
import {
  UpdatePostBodyType,
  formatTitle,
  postErrorMessages
} from './post.utils'
import dayjs from 'dayjs';
import {
  generalErrorMessages,
  handleError
} from '../../generalErrors';

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    base: {
      base_content: postBaseContent
    },
    description: {
      description_content: postDescriptionContent,
    }
  } = req.body as UpdatePostBodyType

  const { unauthorized } = generalErrorMessages

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)
  }
  
  let title = formatTitle(postBaseContent)

  const now = dayjs().toISOString()

  const {
    data,
    error: resError
  } = await supabase.rpc('insert_base_and_description', {
    post_title: title as string,
    enable_reveal: true,
    is_published: true,
    tags: '',
    enable_reveal_date: now,
    allow_published_at: now,
    written_at: now,
    base_content: postBaseContent,
    description_content: postDescriptionContent || ''
  })
  
  console.log(resError)

  if(resError) {
    const error = handleError(postErrorMessages, resError.message)

    return res.status(error.status).send({
      ...error,
      dataError: { resError }
    })
  }

  return res.status(200).send({ id: data })
}