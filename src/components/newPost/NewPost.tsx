import { ChangeEvent, FC } from "react"
import { DisabledField, Field, Label, Textarea } from "../../styled"
import Input, { InputOnChangeType } from "../input/Input"
import { Form, NewPostWrapper, Subtitle, Title } from "./NewPost.styled"

type NewPostType = {
  handleTitleUpdate: (event: InputOnChangeType) => void
  handleSubtitleUpdate: (event: InputOnChangeType) => void
  handlePublicUpdate: (event: ChangeEvent<HTMLTextAreaElement>) => void
  handleFollowUpdate: (event: ChangeEvent<HTMLTextAreaElement>) => void
  handlepPrivateUpdate: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const NewPost: FC<NewPostType> = ({
  handleTitleUpdate,
  handleSubtitleUpdate,
  handlePublicUpdate,
  handleFollowUpdate,
  handlepPrivateUpdate
}) => {

  return (
    <NewPostWrapper>
      <Title>
        New Post?!?
      </Title>
      <Subtitle>
        Share today's thoughts and ideas
      </Subtitle>
      <Form>
        <Field>
          <Label htmlFor='post-title'>
            Title of your post
          </Label>
          <Input
            id='post-title'
            type='text'
            handleChange={handleTitleUpdate} />
        </Field>
        <Field>
          <Label htmlFor='post-subtitle'>
            Subtitle of your post
          </Label>
          <Input
            id='post-subtitle'
            type='text'
            handleChange={handleSubtitleUpdate} />
        </Field>
        <Field>
          <Label htmlFor='post-public'>
            Public - What is up?
          </Label>
          <Textarea
            id='post-public'
            onChange={handlePublicUpdate} />
        </Field>
        <Field>
          <DisabledField /> {/* Temporary */}
          <Label htmlFor='post-follow'>
            Follow - Say Whaat?
          </Label>
          <Textarea
            id='post-follow'
            onChange={handleFollowUpdate} />
        </Field>
        <Field>
          <DisabledField /> {/* Temporary */}
          <Label htmlFor='post-private'>
            Private - You don't day?
          </Label>
          <Textarea
            id='post-private'
            onChange={handlepPrivateUpdate} />
        </Field>
      </Form>
    </NewPostWrapper>
  )
}

export default NewPost