import { FormEvent, forwardRef } from "react";
import { Fields, Label } from "../../styled/forms";
import Input from "../input";
import { InputOnChangeType } from "../input/Input";
import {
  PageTitle,
  Form,
  RegistrationWrapper,
  SubmitButton,
  ToLoginLink
} from "./Registration.styled";

type RegistrationType = {
  password: string
  handlePasswordUpdate: (event: InputOnChangeType) => void
  handleSubmit: (event: FormEvent) => void
}

export const Registration = forwardRef<HTMLInputElement, RegistrationType>(({
  password,
  handlePasswordUpdate,
  handleSubmit
}, ref) => {
  return (
    <RegistrationWrapper>
      <PageTitle>Registration Page</PageTitle>
      <Form>
        <Fields>
          <Label htmlFor="emailAddress">
            Email Address
          </Label>
          <Input
            id='emailAddress'
            type='text'
            ref={ref} />
        </Fields>
        <Fields>
          <Label htmlFor="password">
            Password
          </Label>
          <Input
            id='password'
            type='password'
            value={password}
            handleChange={handlePasswordUpdate} />
        </Fields>
        <SubmitButton onClick={handleSubmit}>
          Submit
        </SubmitButton>
      </Form>
      <ToLoginLink href='/login'>
        Have an account?
      </ToLoginLink>
    </RegistrationWrapper>
  )
})

export default Registration