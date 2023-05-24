import { generalErrorMessages } from "../../../../lib/generalErrors";
import { createPost } from "../../../../lib/postAPI/post.put";
import { NextApiRequest, NextApiResponse } from "next";

export default async function postAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      return createPost(req, res)

    default:
      return res
        .status(generalErrorMessages.unrecognizedMethod.status)
        .send(generalErrorMessages.unrecognizedMethod)
  }
}