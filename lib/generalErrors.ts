type GeneralErrorMessagesType = {
  unrecognizedMethod:     ErrorContent
  unauthorized:           ErrorContent
  ohShit:                 ErrorContent
}

type BasicErrorContent = {
  logMessage: string
  message: string
  status: number
}

type ErrorObject = {
  [key: string]: ErrorContent
}

export type ConstraintErrorContent = BasicErrorContent & {
  constraint: string
}

export type DublicateErrorContent = BasicErrorContent & {
  dublicate: string
}

export type NonNullErrorContent = BasicErrorContent & {
  nonNull: string
}

export type ErrorContent = BasicErrorContent | ConstraintErrorContent | DublicateErrorContent | NonNullErrorContent

export type HandleErrorType = (errorObject: ErrorObject, message: string) => ErrorContent

export const hasConstraint = (obj: ErrorContent): obj is ConstraintErrorContent => {
  const key: keyof ConstraintErrorContent = 'constraint'
  return key in obj
}

export const hasDublicate = (obj: ErrorContent): obj is DublicateErrorContent => {
  const key: keyof DublicateErrorContent = 'dublicate'
  return key in obj
}

export const hasNonNull = (obj: ErrorContent): obj is NonNullErrorContent => {
  const key: keyof NonNullErrorContent = 'nonNull'
  return key in obj
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
  ohShit: {
    logMessage: 'This error type isn\'t configured. Create a case for this in post.utils.ts',
    message:    'Something is wrong. Please notify one of the admins',
    status: 500
  }
}

export const handleError: HandleErrorType = (errorObject, message) => {
  let errorType: string | undefined
  
  for (let i = 0; i < Object.keys(errorObject).length; i++) {
    const key = Object.keys(errorObject)[i]
    const type = errorObject[key] as ErrorContent
    let check: string | undefined

    if(hasConstraint(type)) {
      check = type.constraint

    } else if(hasDublicate(type)) {
      check = type.dublicate

    } else if(hasNonNull(type)) {
      check = type.nonNull

    } else {
      continue
    }

    if(message.includes(check)) {
      errorType = key
      break
    }
  }

  const error = errorObject[errorType || 'default']

  return error
}