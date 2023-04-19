import { FC, FormEvent, MutableRefObject } from "react"
import { Form, NewPostWrapper,  Title } from "./NewPost.styled"
import { Button, ButtonWrapper } from "../../styled/button"
import Tiny from "../tiny"
import { Editor } from "tinymce"

type NewPostType = {
  handleSubmit: (event: FormEvent) => void
  poemRef: MutableRefObject<Editor>
  descriptionRef: MutableRefObject<Editor>
}

const NewPost: FC<NewPostType> = ({
  handleSubmit,
  poemRef,
  descriptionRef
}) => {
  return (
    <NewPostWrapper>
      <Title>
        Wanna share something new?
      </Title>
      <Form>
        <Tiny tinyRef={poemRef} />
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