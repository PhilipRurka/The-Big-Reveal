import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../src/types/supabase-types'
import { UpdatePostBodyType, formatTitle, postErrorMessages } from './post.utils'
import { v4 as uuidv4 } from 'uuid';

export const createPost = async (req: NextApiRequest, res: NextApiResponse ) => {
  const {
    base: {
      author_username,
      post_content: postBaseContent,
      profile_path
    },
    description: {
      post_content: postDescriptionContent,
    }
  } = req.body as UpdatePostBodyType

  const {
    unauthorized,
    missingHeading1,
    multipleHeading1,
    baseTooLong,
    descriptionTooLong,
    dataIssue
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

  } else if(postBaseContent.length > 1000) {
    return res.status(baseTooLong.status).send(baseTooLong)

  } else if(postDescriptionContent && postDescriptionContent.length > 1000) {
    return res.status(descriptionTooLong.status).send(descriptionTooLong)
  }
  /** End Error Block */
  
  let title = formatTitle(postBaseContent)

  const baseId = uuidv4()
  
  console.log(baseId)

  const { error: baseError } = await supabase
  .from('post_base')
  .insert([{
    id: baseId,
    author_username: author_username,
    post_title: title,
    tags: null,
    enable_reveal_date: null,
    enable_reveal: null,
    allow_published_at: null,
    written_at: null,
    is_published: true,
    post_content: postBaseContent,
    profile_path
  }])

  if(baseError) {
    return res.status(dataIssue.status).send({
      ...dataIssue,
      dataError: { baseError }
    })
  }

  const { error: descriptionError } = await supabase
  .from('post_description')
  .insert([{
    id: uuidv4(),
    post_id: baseId,
    post_content: postDescriptionContent
  }])

  /** Start Error Block */
  if(descriptionError) {
    return res.status(dataIssue.status).send({
      ...dataIssue,
      dataError: { descriptionError }
    })
  }
  /** End Error Block */

  return res.status(200).send({ id: baseId })
}