import { FormEvent, forwardRef } from "react";
import {
  AuthWrapper,
  AuthTitle,
  Fields,
  Form,
  Label,
  SubmitButton,
  ToAuthLink
} from "../../styled";
import Input from "../input";
import { InputOnChangeType } from "../input/Input";

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
    <AuthWrapper>
      <AuthTitle>Registration</AuthTitle>
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
      <ToAuthLink href='/login'>
        Have an account?
      </ToAuthLink>
    </AuthWrapper>
  )
})

export default Registration