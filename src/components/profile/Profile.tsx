import { FC } from "react"
import {
  Fields,
  Label
} from "../../styled"
import Input, { InputOnChangeType } from "../input/Input"
import {
  ButtonWrapper,
  Form,
  ProfileWrapper,
  ResetButton,
  SaveButton,
  Subtitle,
  Title
} from "./Profile.styled"
import { handleSaveResetType } from "./Profile.container"

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
        <Fields>
          <Label htmlFor='full-name'>
            Full Name
          </Label>
          <Input
            id='full-name'
            type='text'
            value={fullName as string}
            handleChange={handleFullNameUpdate} />
        </Fields>
        <Fields>
          <Label htmlFor='username'>
            UserName
          </Label>
          <Input
            id='username'
            type='text'
            value={username as string}
            handleChange={handleUserNameUpdate} />
        </Fields>

        <ButtonWrapper>
          <SaveButton
            type='button'
            onClick={handleSave}
            disabled={!hasChangeOccured} >
            Save
          </SaveButton>
          <ResetButton
            type='button'
            onClick={handleReset}
            disabled={!hasChangeOccured} >
            Reset
          </ResetButton>
        </ButtonWrapper>
      </Form>
    </ProfileWrapper>
  )
}

export default Profile