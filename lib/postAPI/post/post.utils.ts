import { Database } from "../../../src/types/supabase-types"

type PostProfileErrorMessagesType = {
  unrecognizedMethod:     ErrorContentType
  missingHeading1:        ErrorContentType
  unauthorized:           ErrorContentType
  multipleHeading1:       ErrorContentType
  baseTooLong:            ErrorContentType
  descriptionTooLong:     ErrorContentType
  dataIssue:              ErrorContentType
}

type ErrorContentType = {
  logMessage: string
  message: string
  status: number
}

type ValidationType = (value: string) => boolean

export type UpdatePostBodyType = {
  base: Database['public']['Tables']['post_base']['Row']
  description: Database['public']['Tables']['post_description']['Row']
}

export const postErrorMessages: PostProfileErrorMessagesType = {
  unrecognizedMethod: {
    logMessage: 'The method requested is not an option',
    message:    'This is a bug, please notify the owner of the project',
    status: 404
  },
  unauthorized: {
    logMessage: 'Either the supabase or session is undefined',
    message:    'Something went wrong. Refresh and try again!',
    status: 403
  },
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
  baseTooLong: {
    logMessage: 'The base post is too long, it exeeds 1000 in length',
    message:    'The length of your poem is too long',
    status: 400
  },
  descriptionTooLong: {
    logMessage: 'The description post is too long, it exeeds 1000 in length',
    message:    'The length of your big reveal is too long',
    status: 400
  },
  dataIssue: {
    logMessage: 'An error has occured on either the post_base or post_description update request',
    message:    'Something went wrong. Refresh and try again!',
    status: 400
  },
}