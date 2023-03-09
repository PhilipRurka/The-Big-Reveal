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
import {
  AuthTransitionIds,
  AuthType,
  RefsType,
} from "./Auth.types";
import { Fields, Label } from "../../styled";
import PasswordField from "../passwordField";
import AuthErrorMessage from "../authResMessage";

const Auth = forwardRef<RefsType, AuthType>(({
  hasEmail,
  hasPassword,
  title,
  handleSubmit,
  toAuthLinks,
  password,
  handlePasswordUpdate,
  validationStatuses,
  disableSubmit,
  statusMessage,
  removeStatusMessage,
  hasPasswordValidation
}, {
  emailRef,
  passwordRef
}: any) => {

  return (
    <AuthWrapper>
      <AuthTitle id={AuthTransitionIds.TITLE}>
        { title }
      </AuthTitle>
      <Form>
        <AuthErrorMessage statusMessage={statusMessage} />
        {hasEmail && (
          <Fields id={AuthTransitionIds.EMAIL}>
            <Label htmlFor="emailAddress">
              Email
            </Label>
            <Input
              id='emailAddress'
              type='text'
              handleChange={removeStatusMessage}
              ref={emailRef} />
          </Fields>
        )}
        <PasswordField
          ref={passwordRef}
          password={password}
          hasPasswordValidation={hasPasswordValidation}
          handlePasswordUpdate={handlePasswordUpdate}
          validationStatuses={validationStatuses}
          hasPassword={hasPassword} />
        <SubmitButton
          onClick={handleSubmit}
          disabled={disableSubmit} >
          Submit
        </SubmitButton>
      </Form>
      {toAuthLinks && (
        <ToAuthLinkWrapper id={AuthTransitionIds.TO_AUTH_LINKS}>
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

Auth.displayName = 'Auth'

export default Auth