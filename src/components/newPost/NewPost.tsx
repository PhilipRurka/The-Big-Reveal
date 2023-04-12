import { ChangeEvent, FC, FormEvent } from "react"
import { Field, Label, Textarea } from "../../styled"
import Input, { InputOnChangeType } from "../input/Input"
import { Form, NewPostWrapper, Subtitle, Title } from "./NewPost.styled"
import { Button, ButtonWrapper } from "../../styled/button"

type NewPostType = {
  titleValue: string
  subtitleValue: string
  publicValue: string
  followValue: string
  privateValue: string
  handleTitleUpdate: (event: InputOnChangeType) => void
  handleSubtitleUpdate: (event: InputOnChangeType) => void
  handlePublicUpdate: (event: ChangeEvent<HTMLTextAreaElement>) => void
  handleFollowUpdate: (event: ChangeEvent<HTMLTextAreaElement>) => void
  handlepPrivateUpdate: (event: ChangeEvent<HTMLTextAreaElement>) => void
  isDisabled: boolean
  handleSubmit: (event: FormEvent) => void
}

const NewPost: FC<NewPostType> = ({
  titleValue,
  subtitleValue,
  publicValue,
  followValue,
  privateValue,
  handleTitleUpdate,
  handleSubtitleUpdate,
  handlePublicUpdate,
  handleFollowUpdate,
  handlepPrivateUpdate,
  isDisabled,
  handleSubmit
}) => {

  return (
    <NewPostWrapper>
      <Title>
        New Post?!?
      </Title>
      <Subtitle>
        {'Share today\'s thoughts and ideas'}
      </Subtitle>
      <Form>
        <Field>
          <Label htmlFor='post-title'>
            Title of your post
          </Label>
          <Input
            id='post-title'
            type='text'
            value={titleValue}
            handleChange={handleTitleUpdate} />
        </Field>
        <Field>
          <Label htmlFor='post-subtitle'>
            Subtitle of your post
          </Label>
          <Input
            id='post-subtitle'
            type='text'
            value={subtitleValue}
            handleChange={handleSubtitleUpdate} />
        </Field>
        <Field>
          <Label htmlFor='post-public'>
            Public - What is up?
          </Label>
          <Textarea
            id='post-public'
            value={publicValue}
            onChange={handlePublicUpdate} />
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
        <Field>
          <Label htmlFor='post-private'>
            {'Private - You don\'t day?'}
          </Label>
          <Textarea
            id='post-private'
            value={privateValue}
            onChange={handlepPrivateUpdate} />
        </Field>
        <ButtonWrapper>
          <Button
            colorType="primary"
            onClick={handleSubmit}
            disabled={isDisabled} >
            Post!
          </Button>
        </ButtonWrapper>
      </Form>
    </NewPostWrapper>
  )
}

export default NewPost