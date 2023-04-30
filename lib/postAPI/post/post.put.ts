import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../src/types/supabase-types'
import { UpdatePostBodyType, formatTitle, postErrorMessages, handleError } from './post.utils'
import dayjs from 'dayjs';
import { generalErrorMessages } from '../../generalErrors';

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    base: {
      post_content: postBaseContent
    },
    description: {
      post_content: postDescriptionContent,
    }
  } = req.body as UpdatePostBodyType

  const { unauthorized } = generalErrorMessages

  const {
    missingHeading1,
    multipleHeading1
  } = postErrorMessages

  const titleArrayLength: number = postBaseContent.split('<h1').length

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  /** Start Error Block */
  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)

  } else if(titleArrayLength === 1 ) {
    return res.status(missingHeading1.status).send(missingHeading1)

  } else if(titleArrayLength >= 3) {
    return res.status(multipleHeading1.status).send(multipleHeading1)
  }
  /** End Error Block */
  
  let title = formatTitle(postBaseContent)

  const now = dayjs().toISOString()

  const {
    data,
    error: resError
  } = await supabase.rpc('insert_base_and_description', {
    post_title: title,
    enable_reveal: true,
    is_published: true,
    tags: '',
    enable_reveal_date: now,
    allow_published_at: now,
    written_at: now,
    base_content: postBaseContent,
    description_content: postDescriptionContent || ''
  })

  /** Start Error Block */
  if(resError) {
    const error = handleError(resError.message)

    return res.status(error.status).send({
      ...error,
      dataError: { resError }
    })
  }
  /** End Error Block */

  return res.status(200).send({ id: data })
}