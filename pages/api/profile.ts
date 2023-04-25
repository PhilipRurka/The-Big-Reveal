import { NextApiRequest, NextApiResponse } from 'next'
import { profileErrorMessages } from '../../lib/profileAPI/post/profile.utils'
import { updateProfile } from '../../lib/profileAPI/post/profile.post'

export default async function ProfileAPI(
  req: NextApiRequest,
  res: NextApiResponse 
) {
  switch (req.method) {
    case 'POST':
      return updateProfile(req, res)

    default:
      return res.status(profileErrorMessages.unrecognizedMethod.status)
                .send(profileErrorMessages.unrecognizedMethod)
  }
}