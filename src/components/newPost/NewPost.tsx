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
import FormMessageContainer from "../formMessage"
import BubbleLayout from "../bubbleLayout"
import NormalLayout from "../normalLayout"
import { Contents } from "../post/Post.type"

export type NewPostType = {
  handleSubmit: (event: FormEvent) => void
  baseRef: MutableRefObject<Editor>
  descriptionRef: MutableRefObject<Editor>
  isEdit?: boolean
  post?: Contents
}

const NewPost: FC<NewPostType> = ({
  handleSubmit,
  baseRef,
  descriptionRef,
  post,
  isEdit
}) => {
  return (
    <NewPostStyled>
      <Title>
        Wanna share something new?
      </Title>
      <Form>
        <BubbleLayout>
          <FormMessageContainer id='newPostFormMessage' />
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