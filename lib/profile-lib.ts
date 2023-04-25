import { NextApiResponse } from "next"

type ProfileErrorMessagesType = {
  unrecognizedMethod:     ErrorContentType
  missingUsername:        ErrorContentType
  unauthorized:           ErrorContentType
  usernameAlreadyExists:  ErrorContentType
  dataIssue:              ErrorContentType
  fullNameIssue:          ErrorContentType
  usernameIssue:          ErrorContentType
}

type ErrorContentType = {
  logMessage: string
  message: string
  status: number
}

type ValidationType = (value: string) => boolean

export type UpdateProfileBodyType = {
  fullName: string
  username: string
}

export const profileErrorMessages: ProfileErrorMessagesType = {
  unrecognizedMethod: {
    logMessage: 'The method requested is not an option',
    message:    'This is a bug, please notify the owner of the project',
    status: 400
  },
  missingUsername: {
    logMessage: 'There is missing a username',
    message:    'A username must be defined',
    status: 404
  },
  unauthorized: {
    logMessage: 'Either the supabase or session is undefined',
    message:    'Something went wrong. Refresh and try again!',
    status: 403
  },
  usernameAlreadyExists: {
    logMessage: 'The username the user attempted to use is already taken',
    message:    'This username already exists',
    status: 400
  },
  dataIssue: {
    logMessage: 'An error has occured on either the profile or post_base update request',
    message:    'Something went wrong. Refresh and try again!',
    status: 400
  },
  fullNameIssue: {
    logMessage: 'The fullName is either longer then 100 or contains invalid characters',
    message:    'Full Name has to be less then 100 characters long and only contain letters and spaces',
    status: 400
  },
  usernameIssue: {
    logMessage: 'The username is either longer then 100 or contains invalid characters',
    message:    'Username has to be less then 100 characters long and only contain letters, spaces, numbers and underscores',
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
 * Less then 100 characters
 * Only contains letters, spaces, numbers and underscores
 */
export const usernameValidation: ValidationType = (username) => {
  if(username.length > 100) return false

  const regex = /^[A-Z0-9 _]*$/
  return regex.test(username)
}