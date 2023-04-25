import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  fullNameValidation,
  profileErrorMessages,
  UpdateProfileBodyType,
  usernameValidation
} from './profile.utils'
import { Database } from '../../../src/types/supabase-types'

export const updateProfile = async (req: NextApiRequest, res: NextApiResponse ) => {
  const {
    fullName,
    username
  } = req.body as UpdateProfileBodyType

  const {
    missingUsername,
    unauthorized,
    usernameAlreadyExists,
    dataIssue,
    fullNameIssue,
    usernameIssue
  } = profileErrorMessages

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  /** Start Error Block */
  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)
    
  } else if(!username) {
    return res.status(missingUsername.status).send(missingUsername)

  } else if(fullName && !fullNameValidation(fullName)) {
    return res.status(fullNameIssue.status).send(fullNameIssue)

  } else if(!usernameValidation(username)) {
    return res.status(usernameIssue.status).send(usernameIssue)
  }
  /** End Error Block */

  const path = username.toLowerCase().replaceAll(/ /g, '-')

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      username: username,
      path
    })
    .eq('id', session.user.id)

  const { error: postBaseError } = await supabase
    .from('post_base')
    .update({
      author_username: username,
      profile_path: path
    })
    .eq('user_id', session.user.id)

  /** Start Error Block */
  if(profileError?.code === '23505') {
    return res.status(usernameAlreadyExists.status).send(usernameAlreadyExists)
    
  } else if(profileError || postBaseError) {
    return res.status(dataIssue.status).send({
      ...dataIssue,
      dataError: {
        profileError,
        postBaseError
      }
    })
  }
  /** End Error Block */

  return res.status(200).send({message: 'Your profile has been updated!'})
}