import { Session, SupabaseClient } from "@supabase/supabase-js";
import { FC, forwardRef } from "react";
import { Fields, Label } from "../../styled/forms";
import Input from "../input";
import { InputOnChangeType, InputRefType } from "../input/Input";
import {
  PageTitle,
  Form,
  LoginWrapper,
  SubmitButton
} from "./Login.styled";

type LoginType = {
  session: Session | null
  supabase: SupabaseClient<any, "public", any>
  password: string
  handlePasswordUpdate: (event: InputOnChangeType) => void
}

export const Login = forwardRef<HTMLInputElement, LoginType>(({
  session,
  supabase,
  password,
  handlePasswordUpdate
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
            ref={ref}
            value={password} />
        </Fields>
        <Fields>
          <Label htmlFor="password">
            Password
          </Label>
          <Input
            id='password'
            type='password'
            handleChange={handlePasswordUpdate} />
        </Fields>
        <SubmitButton>
          Submit
        </SubmitButton>
      </Form>
    </LoginWrapper>
  )
})

export default Login