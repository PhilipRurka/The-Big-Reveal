import React, { FC } from 'react'
import { AuthResMessageType } from './AuthResMessage.container'
import { ResMessage, ResMessageWrapper } from './AuthResMessage.styled'

const AuthResMessage: FC<AuthResMessageType> = ({ statusMessage }) => {
  return (
    <ResMessageWrapper id='status-message-wrapper'>
      <ResMessage
        id='status-message'
        statusType={statusMessage?.type} >
        { statusMessage?.message }
      </ResMessage>
    </ResMessageWrapper>
  )
}

export default AuthResMessage