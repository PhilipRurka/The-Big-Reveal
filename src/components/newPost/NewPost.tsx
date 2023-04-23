import { FC, FormEvent, MutableRefObject } from "react"
import {
  Form,
  Label,
  NewPostWrapper,
  Title
} from "./NewPost.styled"
import { Button, ButtonWrapper } from "../../styled/button"
import Tiny from "../tiny"
import type { Editor } from "tinymce"
import FormMessage from "../FormMessage"
import type { FormMessageContainerType } from "../FormMessage/FormMessage.container"
import BubbleLayout from "../bubbleLayout"
import NormalLayout from "../normalLayout"

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
        <BubbleLayout>
          <FormMessage {...formMessageProps} />
          <Label>
            Drop that poem
          </Label>
          <Tiny
            tinyId={'tiny-base'}
            tinyRef={baseRef} />
        </BubbleLayout>
        <NormalLayout>
          <Label>
            The Big Reveal!
          </Label>
          <Tiny
            tinyId={'tiny-description'}
            tinyRef={descriptionRef} />
          <ButtonWrapper>
            <Button
              colorType="primary"
              onClick={handleSubmit} >
              Post!
            </Button>
          </ButtonWrapper>
        </NormalLayout>
      </Form>
    </NewPostWrapper>
  )
}

export default NewPost