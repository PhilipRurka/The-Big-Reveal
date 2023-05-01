type GeneralErrorMessagesType = {
  unrecognizedMethod:     ErrorContentType
  unauthorized:           ErrorContentType
  ohShit:                 ErrorContentType
}

export type ErrorContentType = {
  logMessage: string
  message: string
  status: number
  constraint?: string
  dublicate?: string
  nonNull?: string
}

export type HandleErrorType = (errorObject: any, message: string) => ErrorContentType

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
  ohShit: {
    logMessage: 'This error type isn\'t configured. Create a case for this in post.utils.ts',
    message:    'Something is wrong. Please notify one of the admins',
    status: 500
  }
}

export const handleError: HandleErrorType = (errorObject, message) => {
  let errorType: any | undefined
  
  for (let i = 0; i < Object.keys(errorObject).length; i++) {
    const key = Object.keys(errorObject)[i]
    const type = errorObject[key] as ErrorContentType
    const check = type.constraint || type.dublicate || type.nonNull

    if(!check) continue

    if(message.includes(check)) {
      errorType = key
      break
    }
  }

  const error = errorObject[errorType || 'default']

  return error
}