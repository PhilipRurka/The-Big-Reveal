import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../src/types/supabase-types'

type UpdateProfileBodyType = {
  fullName: string
  username: string
}

export default async function ProfileAPI(
  req: NextApiRequest,
  res: NextApiResponse 
) {
  switch (req.method) {
    case 'POST':
      return updateProfile(req, res)

    default:
      return res.status(400).send({})
  }
}

const updateProfile = async (req: NextApiRequest, res: NextApiResponse ) => {
  const {
    fullName,
    username
  } = req.body as UpdateProfileBodyType

  if(!username) {
    return res.status(500).send({message: 'Something went wrong. Refresh and try again!'})
  }

  const supabase = createServerSupabaseClient<Database>({req, res})
  const { data: { session } } = await supabase.auth.getSession()

  if(!supabase || !session) {
    return res.status(403).send({message: 'Something went wrong. Refresh and try again!'})
  }

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

  if(profileError?.code === '23505') {
    return res.status(500).send({message: 'This username already exists'})
    
  } else if(profileError || postBaseError) {
    return res.status(405).send({message: 'Something went wrong. Refresh and try again!'})
  }

  return res.status(200).send({message: 'Your profile has been updated!'})
}