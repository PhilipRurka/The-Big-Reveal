import { NextApiRequest, NextApiResponse } from 'next'
import { updateProfile } from '../../../lib/profileAPI/post/profile.post'
import { generalErrorMessages } from '../../../lib/generalErrors'

export default async function ProfileAPI(
  req: NextApiRequest,
  res: NextApiResponse 
) {
  switch (req.method) {
    case 'POST':
      return updateProfile(req, res)

    default:
      return res.status(generalErrorMessages.unrecognizedMethod.status)
                .send(generalErrorMessages.unrecognizedMethod)
  }
}