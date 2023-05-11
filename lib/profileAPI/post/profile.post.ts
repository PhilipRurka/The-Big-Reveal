import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  profileErrorMessages,
  UpdateProfileBodyType,
} from './profile.utils'
import { Database } from '../../../src/types/supabase.type'
import {
  generalErrorMessages,
  handleError
} from '../../generalErrors'

export const updateProfile = async (req: NextApiRequest, res: NextApiResponse ) => {
  const {
    full_name,
    username
  } = req.body as UpdateProfileBodyType

  const { unauthorized } = generalErrorMessages
  const { missingUsername } = profileErrorMessages

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  if(!supabase || !session) {
    return res.status(unauthorized.status).send(unauthorized)
    
  } else if(!username) {
    return res.status(missingUsername.status).send(missingUsername)
  }

  const path = username.toLowerCase().replaceAll(/ /g, '-')

  const { error: resError } = await supabase
    .from('profiles')
    .update({
      full_name,
      username,
      path
    })
    .eq('profile_id', session.user.id)
    
    if(resError) {
      const error = handleError(profileErrorMessages, resError.message)
  
      return res.status(error.status).send({
        ...error,
        dataError: { resError }
      })
    }

  return res.status(200).send({message: 'Your profile has been updated!'})
}