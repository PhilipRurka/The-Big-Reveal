import { forwardRef } from "react";
import {
  AuthWrapper,
  AuthTitle,
  Form,
  SubmitButton,
  ToAuthLinkWrapper,
  ToAuthLinkItem
} from "./Auth.styled";
import Input from "../input";
import { AuthPropsType, TypePropsType } from "./Auth.container";
import { Fields, Label } from "../../styled";
import PasswordField from "../passwordField";

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
  validationStatuses
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
          <PasswordField
            password={password}
            ref={passwordRef}
            handlePasswordUpdate={handlePasswordUpdate}
            validationStatuses={validationStatuses} />
        )}
        <SubmitButton
          onClick={submitFunction}
          disabled={!validationStatuses?.isSuccess} >
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