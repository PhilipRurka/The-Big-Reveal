import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  fullNameValidation,
  profileErrorMessages,
  UpdateProfileBodyType,
  usernameValidation
} from './profile.utils'
import { Database } from '../../../src/types/supabase-types'
import { generalErrorMessages } from '../../generalErrors'

export const updateProfile = async (req: NextApiRequest, res: NextApiResponse ) => {
  const {
    full_name,
    username
  } = req.body as UpdateProfileBodyType

  const { unauthorized } = generalErrorMessages

  const {
    missingUsername,
    usernameAlreadyExists,
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

  } else if(full_name && !fullNameValidation(full_name)) {
    return res.status(fullNameIssue.status).send(fullNameIssue)

  } else if(!usernameValidation(username)) {
    return res.status(usernameIssue.status).send(usernameIssue)
  }
  /** End Error Block */

  const path = username.toLowerCase().replaceAll(/ /g, '-')

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name,
      username,
      path
    })
    .eq('id', session.user.id)

    if(profileError?.code === '23505') {
      return res.status(usernameAlreadyExists.status).send(usernameAlreadyExists)
      
    } else if(profileError) {
    return res.status(dataIssue.status).send({
      ...dataIssue,
      dataError: { profileError }
    })
  }

  return res.status(200).send({message: 'Your profile has been updated!'})
}