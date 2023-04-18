import { ChangeEvent, FC, FormEvent, MutableRefObject, forwardRef } from "react"
import { Field, Label, Textarea } from "../../styled"
import Input, { InputOnChangeType } from "../input/Input"
import { Form, NewPostWrapper, Subtitle, Title } from "./NewPost.styled"
import { Button, ButtonWrapper } from "../../styled/button"
import Tiny from "../tiny"
import { Editor } from "tinymce"

type NewPostType = {
  titleValue: string
  handleTitleUpdate: (event: InputOnChangeType) => void
  handleSubmit: (event: FormEvent) => void
  poemRef: MutableRefObject<Editor>
}

const NewPost: FC<NewPostType> = ({
  titleValue,
  handleTitleUpdate,
  handleSubmit,
  poemRef
}) => {

  return (
    <NewPostWrapper>
      <Title>
        Wanna share something new?
      </Title>
      <Subtitle>
        {'Share today\'s thoughts and ideas'}
      </Subtitle>
      <Form>
        <Field>
          <Label htmlFor='post-title'>
            Title of your work
          </Label>
          <Input
            id='post-title'
            type='text'
            value={titleValue}
            handleChange={handleTitleUpdate} />
        </Field>
        {/* <Field>
          <Label htmlFor='post-subtitle'>
            Subtitle of your post
          </Label>
          <Input
            id='post-subtitle'
            type='text'
            value={subtitleValue}
            handleChange={handleSubtitleUpdate} />
        </Field> */}
        <Field>
          <Label>
            Drop that work of art!
          </Label>
          {/* <Textarea
            id='post-public'
            value={publicValue}
            onChange={handlePublicUpdate} /> */}
            <Tiny tinyRef={poemRef} />
        </Field>
        {/* <Field>
          <Label htmlFor='post-follow'>
            Follow - Say Whaat?
          </Label>
          <Textarea
            id='post-follow'
            value={followValue}
            onChange={handleFollowUpdate} />
        </Field> */}
        {/* <Field>
          <Label htmlFor='post-private'>
            {'Private - You don\'t day?'}
          </Label>
          <Textarea
            id='post-private'
            value={privateValue}
            onChange={handlepPrivateUpdate} />
        </Field> */}
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