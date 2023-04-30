type GeneralErrorMessagesType = {
  unrecognizedMethod:     ErrorContentType
  unauthorized:           ErrorContentType
  // dataIssue:              ErrorContentType
}

export type ErrorContentType = {
  logMessage: string
  message: string
  status: number
}

export const generalErrorMessages: GeneralErrorMessagesType = {
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
  // dataIssue: {
  //   logMessage: 'An error has occured on the request for data',
  //   message:    'Something went wrong. Refresh and try again!',
  //   status: 400
  // }
}