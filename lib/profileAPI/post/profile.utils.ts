import { Database } from "../../../src/types/supabase.type"
import {
  ErrorContentType,
  generalErrorMessages
} from "../../generalErrors"

type ProfileErrorMessagesType = {
  missingUsername:        ErrorContentType
  usernameAlreadyExists:  ErrorContentType
  fullNameLength:         ErrorContentType
  fullNameFormating:      ErrorContentType
  usernameFormating:      ErrorContentType
  usernameLength:         ErrorContentType
  default:                ErrorContentType
}

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
    dublicate:  'profiles_username_key',
    status: 400
  },
  fullNameFormating: {
    logMessage: 'Full Name contains invalid characters',
    message:    'Full Name must only contain letters and spaces',
    constraint: 'full_name_formating',
    status: 400
  },
  fullNameLength: {
    logMessage: 'The fullName is longer then 100',
    message:    'Full Name has to be less then 100 characters long',
    constraint: 'full_name_length',
    status: 400
  },
  usernameLength: {
    logMessage: 'The username is either shorter then 3 or longer then 100',
    message:    'Username has to be between 3 and 100 characters long',
    constraint: 'username_length',
    status: 400
  },
  usernameFormating: {
    logMessage: 'The username contains invalid characters',
    message:    'Username must only contain letters, spaces, numbers and underscores',
    constraint: 'usernameFormating',
    status: 400
  },
  default: generalErrorMessages.ohShit
}