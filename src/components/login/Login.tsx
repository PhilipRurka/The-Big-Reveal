import { FormEvent, forwardRef } from "react";
import { Fields, Label } from "../../styled/forms";
import Input from "../input";
import { InputOnChangeType } from "../input/Input";
import {
  PageTitle,
  Form,
  LoginWrapper,
  SubmitButton,
  ToRegistrationLink
} from "./Login.styled";

type LoginType = {
  password: string
  handlePasswordUpdate: (event: InputOnChangeType) => void
  handleSubmit: (event: FormEvent) => void
}

export const Login = forwardRef<HTMLInputElement, LoginType>(({
  password,
  handlePasswordUpdate,
  handleSubmit
}, ref) => {
  return (
    <LoginWrapper>
      <PageTitle>Login Page</PageTitle>
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
      <ToRegistrationLink href='/registration'>
        Don't have an account?
      </ToRegistrationLink>
    </LoginWrapper>
  )
})

export default Login