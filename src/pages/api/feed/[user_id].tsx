import { NextApiRequest, NextApiResponse } from "next";
import { selectFeedUserId } from "../../../../lib/feed/userIdAPI/get/feed-userId.get";
import { generalErrorMessages } from "../../../../lib/generalErrors";

export default async function feedAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { user_id } = req.query
      return selectFeedUserId(req, res, user_id as string)

    default:
      return res.status(generalErrorMessages.unrecognizedMethod.status)
                .send(generalErrorMessages.unrecognizedMethod)
  }
}