import type { FC } from 'react'

import {
  FormMessageWrapper,
  FormMessageStyled
} from './FormMessage.styled'
import { StatusMessageTypesEnum } from './FormMessage.container'

export type FormMessageType = {
  message: string
  type: StatusMessageTypesEnum | null
}

const FormMessage: FC<FormMessageType> = ({
  message,
  type
}) => {
  return (
    <FormMessageStyled id='status-message-wrapper'>
      <FormMessageWrapper
        id='status-message'
        statusType={type} >
        { message }
      </FormMessageWrapper>
    </FormMessageStyled>
  )
}

export default FormMessage