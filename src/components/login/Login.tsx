import { FormEvent, forwardRef } from "react";
import {
  AuthWrapper,
  AuthTitle,
  Fields,
  Form,
  Label,
  SubmitButton,
  ToAuthLink,
  PasswordInput
} from "../../styled";
import Input from "../input";
import { InputOnChangeType } from "../input/Input";

type LoginType = {
  password: string
  handlePasswordUpdate: (event: InputOnChangeType) => void
  handleSubmit: (event: FormEvent) => void
}

export const Login = forwardRef<HTMLInputElement, LoginType>(({
  password,
  handlePasswordUpdate,
  handleSubmit
}, ref) => (
  <AuthWrapper>
    <AuthTitle>Login</AuthTitle>
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
        <PasswordInput
          id='password'
          type='password'
          value={password}
          handleChange={handlePasswordUpdate} />
      </Fields>
      <SubmitButton onClick={handleSubmit}>
        Submit
      </SubmitButton>
    </Form>
    <ToAuthLink href='/registration'>
      Don't have an account?
    </ToAuthLink>
  </AuthWrapper>
))

export default Login