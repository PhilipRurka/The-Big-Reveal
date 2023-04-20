import { FC, FormEvent, MutableRefObject } from "react"
import { Form, NewPostWrapper,  Title } from "./NewPost.styled"
import { Button, ButtonWrapper } from "../../styled/button"
import Tiny from "../tiny"
import { Editor } from "tinymce"
import { Label } from "../../styled"
import FormMessage from "../authResMessage"
import { FormMessageContainerType } from "../authResMessage/FormMessage.container"

type NewPostType = {
  handleSubmit: (event: FormEvent) => void
  baseRef: MutableRefObject<Editor>
  descriptionRef: MutableRefObject<Editor>
  formMessageProps: FormMessageContainerType
}

const NewPost: FC<NewPostType> = ({
  handleSubmit,
  baseRef,
  descriptionRef,
  formMessageProps
}) => {
  return (
    <NewPostWrapper>
      <Title>
        Wanna share something new?
      </Title>
      <Form>
        <FormMessage {...formMessageProps} />
        <Label>
          Drop that poem
        </Label>
        <Tiny tinyRef={baseRef} />
        <Label>
          The Big Reveal!
        </Label>
        <Tiny tinyRef={descriptionRef} />
        <ButtonWrapper>
          <Button
            colorType="primary"
            onClick={handleSubmit} >
            Post!
          </Button>
        </ButtonWrapper>
      </Form>
    </NewPostWrapper>
  )
}

export default NewPost