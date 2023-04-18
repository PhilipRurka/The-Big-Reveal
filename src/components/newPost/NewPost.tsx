import { FC, FormEvent, MutableRefObject } from "react"
import { Field, Label } from "../../styled"
import { Form, NewPostWrapper,  Title } from "./NewPost.styled"
import { Button, ButtonWrapper } from "../../styled/button"
import Tiny from "../tiny"
import { Editor } from "tinymce"

type NewPostType = {
  handleSubmit: (event: FormEvent) => void
  poemRef: MutableRefObject<Editor>
}

const NewPost: FC<NewPostType> = ({
  handleSubmit,
  poemRef
}) => {

  return (
    <NewPostWrapper>
      <Title>
        Wanna share something new?
      </Title>
      <Form>
        <Field>
          <Label>
            Drop that work of art!
          </Label>
            <Tiny tinyRef={poemRef} />
        </Field>
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