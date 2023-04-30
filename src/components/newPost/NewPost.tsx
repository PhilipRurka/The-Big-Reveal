import { FC, FormEvent, MutableRefObject } from "react"
import {
  Form,
  Label,
  NewPostStyled,
  Title
} from "./NewPost.styled"
import { Button, ButtonStyled } from "../../styled/button"
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
    <NewPostStyled>
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
          <ButtonStyled>
            <Button
              colorType="primary"
              onClick={handleSubmit} >
              Post!
            </Button>
          </ButtonStyled>
        </NormalLayout>
      </Form>
    </NewPostStyled>
  )
}

export default NewPost