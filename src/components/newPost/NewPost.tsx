import { FC, FormEvent, MutableRefObject } from "react"
import {
  Form,
  Label,
  NewPostStyled,
  Title
} from "./NewPost.styled"
import {
  Button,
  ButtonWrapper
} from "../../styled/button"
import Tiny from "../tiny"
import type { Editor } from "tinymce"
import FormMessage from "../formMessage"
import type { FormMessageContainerType } from "../formMessage/FormMessage.container"
import BubbleLayout from "../bubbleLayout"
import NormalLayout from "../normalLayout"
import { ContentsType } from "../../pages/post/[post-id]"

export type NewPostType = {
  handleSubmit: (event: FormEvent) => void
  baseRef: MutableRefObject<Editor>
  descriptionRef: MutableRefObject<Editor>
  formMessageProps: FormMessageContainerType
  isEdit?: boolean
  post?: ContentsType
}

const NewPost: FC<NewPostType> = ({
  handleSubmit,
  baseRef,
  descriptionRef,
  post,
  formMessageProps,
  isEdit
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
            tinyRef={baseRef}
            tinyInitValue={post?.baseContent} />
        </BubbleLayout>
        <NormalLayout>
          <Label>
            The Big Reveal!
          </Label>
          <Tiny
            tinyId={'tiny-description'}
            tinyRef={descriptionRef}
            tinyInitValue={post?.descriptionContent} />
          <ButtonWrapper>
            <Button
              colorType="primary"
              onClick={handleSubmit} >
              {isEdit ? 'Update!' : 'Post!'}
            </Button>
          </ButtonWrapper>
        </NormalLayout>
      </Form>
    </NewPostStyled>
  )
}

export default NewPost