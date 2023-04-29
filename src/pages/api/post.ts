import { generalErrorMessages } from "../../../lib/generalErrors";
import { createPost } from "../../../lib/postAPI/post/post.put";
import { NextApiRequest, NextApiResponse } from "next";

export default async function postAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // case 'GET':
    //   return selectPost(req, res)

    case 'PUT':
      return createPost(req, res)

    // case 'POST':
    //   return updatePost(req, res)

    default:
      return res.status(generalErrorMessages.unrecognizedMethod.status)
                .send(generalErrorMessages.unrecognizedMethod)
  }
}