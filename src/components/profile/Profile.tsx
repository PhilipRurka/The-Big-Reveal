import { FC } from "react"
import {
  Field,
  Label
} from "../../styled"
import Input, { InputOnChangeType } from "../input/Input"
import {
  Form,
  ProfileStyled,
  Subtitle,
  Title
} from "./Profile.styled"
import { handleSaveResetType } from "./Profile.container"
import {
  ButtonStyled,
  Button
} from "../../styled/button"
import FormMessage from "../FormMessage"
import type { FormMessageContainerType } from "../FormMessage/FormMessage.container";

type ProfileType = {
  subtitle: string
  fullName: null | string
  username: null | string
  handleFullNameUpdate: (event: InputOnChangeType) => void
  handleUserNameUpdate: (event: InputOnChangeType) => void
  handleSave: handleSaveResetType
  handleReset: handleSaveResetType
  hasChangeOccured:boolean
  formMessageProps: FormMessageContainerType
}

const Profile: FC<ProfileType> = ({
    subtitle,
    fullName,
    username,
    handleFullNameUpdate,
    handleUserNameUpdate,
    handleSave,
    handleReset,
    hasChangeOccured,
    formMessageProps
  }) => {
  return (
    <ProfileStyled>
      <Title>Profile</Title>
      <Subtitle>{ subtitle }</Subtitle>
      <Form>
        <FormMessage
          message={formMessageProps.message}
          type={formMessageProps.type}
          showMessage={formMessageProps.showMessage} />
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
            Username
          </Label>
          <Input
            id='username'
            type='text'
            value={username as string}
            handleChange={handleUserNameUpdate} />
        </Field>

        <ButtonStyled>
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
        </ButtonStyled>
      </Form>
    </ProfileStyled>
  )
}

export default Profile