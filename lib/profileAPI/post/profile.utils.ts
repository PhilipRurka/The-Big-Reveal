import { Database } from "../../../src/types/supabase-types"

type ProfileErrorMessagesType = {
  missingUsername:        ErrorContentType
  usernameAlreadyExists:  ErrorContentType
  fullNameIssue:          ErrorContentType
  usernameIssue:          ErrorContentType
}

type ErrorContentType = {
  logMessage: string
  message: string
  status: number
}

type ValidationType = (value: string) => boolean

export type UpdateProfileBodyType = Database['public']['Tables']['profiles']['Row']

export const profileErrorMessages: ProfileErrorMessagesType = {
  missingUsername: {
    logMessage: 'There is missing a username',
    message:    'A username must be defined',
    status: 404
  },
  usernameAlreadyExists: {
    logMessage: 'The username the user attempted to use is already taken',
    message:    'This username already exists',
    status: 400
  },
  fullNameIssue: {
    logMessage: 'The fullName is either longer then 100 or contains invalid characters',
    message:    'Full Name has to be less then 100 characters long and only contain letters and spaces',
    status: 400
  },
  usernameIssue: {
    logMessage: 'The username is either shorter then 3 or longer then 100 or contains invalid characters',
    message:    'Username has to be between 3 and 100 characters long and only contain letters, spaces, numbers and underscores',
    status: 400
  }
}

/**
 * Less then 100 characters
 * Only contains letters and spaces
 */
export const fullNameValidation: ValidationType = (fullName) => {
  if(fullName.length > 100) return false

  const regex =  /^[A-Za-z\s]*$/
  return regex.test(fullName)
}

/**
 * More then 3 and less then 100 characters
 * Only contains letters, spaces, numbers and underscores
 */
export const usernameValidation: ValidationType = (username) => {
  if(3 > username.length || username.length > 100) return false

  const regex = /^[0-9A-Za-z\s\_]+$/
  return regex.test(username)
}