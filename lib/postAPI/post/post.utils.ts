import { Database } from "../../../src/types/supabase-types"
import { ErrorContentType } from "../../generalErrors"

type HandleErrorType = (message: string) => {
  status: number
  error: ErrorContentType
}

type PostProfileErrorMessagesType = {
  missingHeading1:        ErrorContentType
  multipleHeading1:       ErrorContentType
  baseContentTooLong:     ErrorContentType
  baseTitleTooLong:       ErrorContentType
  descriptionTooLong:     ErrorContentType
  default:                ErrorContentType
}

export type UpdatePostBodyType = {
  base: Database['public']['Tables']['post_base']['Row']
  description: Database['public']['Tables']['post_description']['Row']
}

export const postErrorMessages: PostProfileErrorMessagesType = {
  missingHeading1: {
    logMessage: 'The post is missing a heading 1',
    message:    'Your poem requires a "Heading 1"',
    status: 400
  },
  multipleHeading1: {
    logMessage: 'The post has more then one heading 1, there can only be one',
    message:    'You can only have one "Heading 1"',
    status: 400
  },
  baseContentTooLong: {
    logMessage: 'The base post is too long, it exeeds 1000 in length',
    message:    'The length of your poem is too long',
    status: 400
  },
  baseTitleTooLong: {
    logMessage: 'The base post is too long, it exeeds 50 in length',
    message:    'The length of your heading 1 is too long, it can not exeed 50 charactors',
    status: 400
  },
  descriptionTooLong: {
    logMessage: 'The description post is too long, it exeeds 1000 in length',
    message:    'The length of your big reveal is too long',
    status: 400
  },
  default: {
    logMessage: 'This error type isn\'t configured. Create a case for this in post.utils.ts',
    message:    'Something is wrong. Please notify one of the admins',
    status: 500
  }
}

export const formatTitle = (rawTitle: string): string => {
  let title = rawTitle.split('</h1>')[0]
  title = title.replace('>', '')
  title = title.replace(/<h1 [A-Za-z0-9]+="[^"]*"/g, '')
  title = title.replace(/<h1/g, '')
  title = title.replaceAll(/<span [A-Za-z0-9]+="[^"]*">/g, '').replaceAll('</span>', '')
  title = title.replaceAll('<strong>', '').replaceAll('</strong>', '')
  title = title.replaceAll('<em>', '').replaceAll('</em>', '')
  return title
}

export const handleError: HandleErrorType = (message) => {
  let errorType: keyof PostProfileErrorMessagesType

  if(message.includes('base_content_length')) {
    errorType = "baseContentTooLong"

  } else if(message.includes('base_title_length')) { 
    errorType = "baseTitleTooLong"

  } else if(message.includes('description_content_length')) {
    errorType =  "descriptionTooLong"

  } else {
    errorType = "default"
  }

  const error = postErrorMessages[errorType]

  return {
    status: error.status,
    error
  }
}