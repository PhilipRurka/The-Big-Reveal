import { FC } from 'react'
import {
  FormMessageContent,
  FormMessageStyled
} from './FormMessage.styled'
import { FormMessageContainerType, StatusMessageTypesEnum } from './FormMessage.container'

export type FormMessageType = {
  message: string
  type: StatusMessageTypesEnum | undefined
}

const FormMessage: FC<FormMessageType> = ({
  message,
  type
}) => {
  return (
    <FormMessageStyled id='status-message-wrapper'>
      <FormMessageContent
        id='status-message'
        statusType={type} >
        { message }
      </FormMessageContent>
    </FormMessageStyled>
  )
}

export default FormMessage