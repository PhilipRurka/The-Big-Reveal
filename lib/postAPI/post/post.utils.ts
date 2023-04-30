import { Database } from "../../../src/types/supabase-types"
import {
  ErrorContentType,
  generalErrorMessages
} from "../../generalErrors"

type PostErrorMessagesType = {
  missingHeading1:        ErrorContentType
  baseContentTooLong:     ErrorContentType
  baseTitleTooLong:       ErrorContentType
  descriptionTooLong:     ErrorContentType
  default:                ErrorContentType
}

export type UpdatePostBodyType = {
  base: Database['public']['Tables']['post_base']['Row']
  description: Database['public']['Tables']['post_description']['Row']
}

export const postErrorMessages: PostErrorMessagesType = {
  missingHeading1: {
    logMessage: 'The post is missing a heading 1',
    message:    'Your poem requires a "Heading 1"',
    nonNull:    'null value in column "post_title"',
    status: 400
  },
  baseContentTooLong: {
    logMessage: 'The base post is too long, it exeeds 1000 in length',
    message:    'The length of your poem is too long',
    constraint: 'base_content_length',
    status: 400
  },
  baseTitleTooLong: {
    logMessage: 'The base post is too long, it exeeds 50 in length',
    message:    'The length of your heading 1 is too long, it can not exeed 50 charactors',
    constraint: 'base_title_length',
    status: 400
  },
  descriptionTooLong: {
    logMessage: 'The description post is too long, it exeeds 1000 in length',
    message:    'The length of your big reveal is too long',
    constraint: 'description_content_length',
    status: 400
  },
  default: generalErrorMessages.ohShit
}

export const formatTitle = (rawBaseContent: string): string | null => {
  const titleArrayLength: number = rawBaseContent.split('<h1').length

  if(titleArrayLength === 1 ) {
    return null
  }

  let title = rawBaseContent.split('</h1>')[0]
  title = title.replace('>', '')
  title = title.replace(/<h1 [A-Za-z0-9]+="[^"]*"/g, '')
  title = title.replace(/<h1/g, '')
  title = title.replaceAll(/<span [A-Za-z0-9]+="[^"]*">/g, '').replaceAll('</span>', '')
  title = title.replaceAll('<strong>', '').replaceAll('</strong>', '')
  title = title.replaceAll('<em>', '').replaceAll('</em>', '')
  return title
}