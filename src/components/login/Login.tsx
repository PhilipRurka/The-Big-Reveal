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
  isPasswordFocussed: boolean
}

export const Login = forwardRef<any, LoginType>(({
  password,
  handlePasswordUpdate,
  handleSubmit,
  isPasswordFocussed
}, refs) => {
  const {
    emailRef,
    passwordRef
  } = refs as any

  return (
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
            ref={emailRef} />
        </Fields>
        <Fields>
          <Label htmlFor="password">
            Password
          </Label>
          <PasswordInput
            id='password'
            type='password'
            value={password}
            ref={passwordRef}
            handleChange={handlePasswordUpdate}
            isPasswordFocussed={isPasswordFocussed} />
        </Fields>
        <SubmitButton onClick={handleSubmit}>
          Submit
        </SubmitButton>
      </Form>
      <ToAuthLink href='/registration'>
        Don't have an account?
      </ToAuthLink>
    </AuthWrapper>
  )
})

export default Login