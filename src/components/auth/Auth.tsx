import { forwardRef } from "react";
import {
  AuthWrapper,
  AuthTitle,
  Form,
  SubmitButton,
  ToAuthLinkWrapper,
  ToAuthLinkItem,
  ErrorMessageWrapper,
  ErrorMessage
} from "./Auth.styled";
import Input from "../input";
import type {
  AuthType,
  RefsType,
} from "./Auth.types";
import { Fields, Label } from "../../styled";
import PasswordField from "../passwordField";

const Auth = forwardRef<RefsType, AuthType>(({
  hasEmail,
  hasPassword,
  title,
  submitFunction,
  toAuthLinks,
  password,
  handlePasswordUpdate,
  validationStatuses,
  errorMessage,
  handleAnyInputChange,
  // temporaryFunction
}, {
  emailRef,
  passwordRef
}: any) => {

  return (
    <AuthWrapper> 
      <AuthTitle>{ title }</AuthTitle>
      <ErrorMessageWrapper id='error-message-wrapper'>
        <ErrorMessage id='error-message'>
          { errorMessage }
        </ErrorMessage>
      </ErrorMessageWrapper>
      <Form>
        {hasEmail && (
          <Fields>
            <Label htmlFor="emailAddress">
              Email
            </Label>
            <Input
              id='emailAddress'
              type='text'
              handleChange={handleAnyInputChange}
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

      {/* <button style={{padding: '10px', backgroundColor: 'gray', margin: '30px auto 0'}} onClick={temporaryFunction}>Hit</button> */}
    </AuthWrapper>
  )
})

export default Auth