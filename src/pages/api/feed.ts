import { NextApiRequest, NextApiResponse } from "next";
import { generalErrorMessages } from "../../../lib/generalErrors";
import { selectFeed } from "../../../lib/feedAPI/get/feed.get";

export default async function feedAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return selectFeed(req, res)

    default:
      return res.status(generalErrorMessages.unrecognizedMethod.status)
                .send(generalErrorMessages.unrecognizedMethod)
  }
}