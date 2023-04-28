import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../src/types/supabase-types'
import { UpdatePostBodyType, formatTitle, postErrorMessages } from './post.utils'
import { v4 as uuidv4 } from 'uuid';
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

  const {
    unauthorized,
    dataIssue
  } = generalErrorMessages

  const {
    missingHeading1,
    multipleHeading1,
    baseTooLong,
    descriptionTooLong
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

  } else if(postBaseContent.length > 10000) {
    return res.status(baseTooLong.status).send(baseTooLong)

  } else if(postDescriptionContent && postDescriptionContent.length > 10000) {
    return res.status(descriptionTooLong.status).send(descriptionTooLong)
  }
  /** End Error Block */
  
  let title = formatTitle(postBaseContent)

  const baseId = uuidv4()

  const now = dayjs().toISOString()

  const { error } = await supabase.rpc('insert_base_and_description', {
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
  if(error) {
    console.log(error)
    return res.status(dataIssue.status).send({
      ...dataIssue,
      dataError: { error }
    })
  }
  /** End Error Block */

  return res.status(200).send({ id: baseId })
}