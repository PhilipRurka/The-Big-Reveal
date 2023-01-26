import { forwardRef } from "react";
import {
  AuthWrapper,
  AuthTitle,
  Form,
  SubmitButton,
  ToAuthLinkWrapper,
  ToAuthLinkItem,
  PasswordInput
} from "./Auth.styled";
import Input from "../input";
import PasswordValidation from "../passwordValidation";
import { AuthPropsType, TypePropsType } from "./Auth.container";
import { Fields, Label } from "../../styled";

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
  isPasswordFocused,
  validationStatuses
}, {
  emailRef,
  passwordRef
}: any) => {

  console.table({ validationStatuses })

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
              {validationStatuses && (
                <PasswordValidation validationStatuses={validationStatuses} />
              )}
          </Fields>
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