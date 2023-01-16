import { forwardRef, Ref, RefObject } from "react";
import {
  AuthWrapper,
  AuthTitle,
  Fields,
  Form,
  Label,
  SubmitButton,
  ToAuthLinkWrapper,
  ToAuthLinkItem,
  PasswordInput
} from "../../styled";
import Input from "../input";
import PasswordValidation from "../passwordValidation";
import { AuthPropsType, TypePropsType } from "./Auth.container";

type RefsType = {
  emailRef?:    HTMLInputElement
  passwordRef?: HTMLInputElement
}

type AuthType = AuthPropsType & TypePropsType

const Auth = forwardRef<RefsType, AuthType>(({
  hasEmail,
  hasPassword,
  title,
  submitFunction,
  toAuthLinks,
  password,
  handlePasswordUpdate,
  isPasswordFocused
}, {
  emailRef,
  passwordRef
}: any) => {

  return (
    <AuthWrapper> 
      <AuthTitle>{ title }</AuthTitle>
      <Form>
        {hasEmail && (
          <Fields>
            <Label htmlFor="emailAddress">
              Email
            </Label>
            <Input
              id='emailAddress'
              type='text'
              ref={emailRef} />
          </Fields>
        )}
        {hasPassword && (
          <Fields>
            <Label htmlFor="password">
              Password
            </Label>
            <PasswordInput
              id='password'
              type='password'
              value={password}
              ref={passwordRef}
              onChange={handlePasswordUpdate}
              isPasswordFocussed={isPasswordFocused} />
            <PasswordValidation />
          </Fields>
        )}
        <SubmitButton onClick={submitFunction}>
          Submit
        </SubmitButton>
      </Form>
      {toAuthLinks && (
        <ToAuthLinkWrapper>
          {toAuthLinks.map(({
            href: toLinkHref,
            title: toLinkTitle
          }) => (
            <ToAuthLinkItem
              key={toLinkTitle}
              href={toLinkHref} >
              { toLinkTitle }
            </ToAuthLinkItem>
          ))}
        </ToAuthLinkWrapper>
      )}
    </AuthWrapper>
  )
})

export default Auth