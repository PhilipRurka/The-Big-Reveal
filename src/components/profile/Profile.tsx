import { FC } from "react"
import {
  Field,
  Label
} from "../../styled"
import Input, { InputOnChangeType } from "../input/Input"
import {
  Form,
  ProfileWrapper,
  Subtitle,
  Title
} from "./Profile.styled"
import { handleSaveResetType } from "./Profile.container"
import {
  ButtonWrapper,
  Button
} from "../../styled/button"

type ProfileType = {
  subtitle: string
  fullName: null | string
  username: null | string
  handleFullNameUpdate: (event: InputOnChangeType) => void
  handleUserNameUpdate: (event: InputOnChangeType) => void
  handleSave: handleSaveResetType
  handleReset: handleSaveResetType
  hasChangeOccured:boolean
}

const Profile: FC<ProfileType> = ({
    subtitle,
    fullName,
    username,
    handleFullNameUpdate,
    handleUserNameUpdate,
    handleSave,
    handleReset,
    hasChangeOccured
  }) => {
  return (
    <ProfileWrapper>
      <Title>Profile</Title>
      <Subtitle>{ subtitle }</Subtitle>
      <Form>
        <Field>
          <Label htmlFor='full-name'>
            Full Name
          </Label>
          <Input
            id='full-name'
            type='text'
            value={fullName as string}
            handleChange={handleFullNameUpdate} />
        </Field>
        <Field>
          <Label htmlFor='username'>
            UserName
          </Label>
          <Input
            id='username'
            type='text'
            value={username as string}
            handleChange={handleUserNameUpdate} />
        </Field>

        <ButtonWrapper>
          <Button
            type='button'
            colorType="primary"
            onClick={handleSave}
            disabled={!hasChangeOccured} >
            Save
          </Button>
          <Button
            type='button'
            colorType="primary"
            onClick={handleReset}
            disabled={!hasChangeOccured} >
            Reset
          </Button>
        </ButtonWrapper>
      </Form>
    </ProfileWrapper>
  )
}

export default Profile