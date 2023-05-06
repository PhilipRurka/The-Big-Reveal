import { generalErrorMessages } from "../../../../lib/generalErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { updatePost } from "../../../../lib/postAPI/post.post";
import { deletePost } from "../../../../lib/postAPI/post.delete";
import { QueryType } from "../../../../lib/postAPI/utils";

export default async function postAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = (req.query as QueryType)['post-id']

  switch (req.method) {
    case 'POST':
      return updatePost(id, req, res)

    case 'DELETE':
      return deletePost(id, req, res)

    default:
      return res.status(generalErrorMessages.unrecognizedMethod.status)
                .send(generalErrorMessages.unrecognizedMethod)
  }
}