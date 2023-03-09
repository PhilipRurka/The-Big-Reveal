import React, { FC } from 'react'
import { AuthErrorMessageType } from './AuthErrorMessage.container'
import { ErrorMessage, ErrorMessageWrapper } from './AuthErrorMessage.styled'

const AuthErrorMessage: FC<AuthErrorMessageType> = ({ statusMessage }) => {
  return (
    <ErrorMessageWrapper id='status-message-wrapper'>
      <ErrorMessage
        id='status-message'
        statusType={statusMessage?.type} >
        { statusMessage?.message }
      </ErrorMessage>
    </ErrorMessageWrapper>
  )
}

export default AuthErrorMessage