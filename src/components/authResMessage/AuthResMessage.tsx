import { FC } from 'react'
import { StatusMessageTypesEnum } from '../auth/Auth.types'
import { ResMessage, ResMessageWrapper } from './AuthResMessage.styled'

export type AuthResMessageType = {
  message: string
  type: StatusMessageTypesEnum
}

const AuthResMessage: FC<AuthResMessageType> = ({
  message,
  type
}) => {
  return (
    <ResMessageWrapper id='status-message-wrapper'>
      <ResMessage
        id='status-message'
        statusType={type} >
        {message}
      </ResMessage>
    </ResMessageWrapper>
  )
}

export default AuthResMessage