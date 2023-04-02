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
  AuthTransitionIdsEnum,
  AuthType,
  RefsType,
} from "./Auth.types";
import { Fields, Label } from "../../styled";
import PasswordField from "../passwordField";
import AuthResMessage from "../authResMessage";
import ConfirmedPasswordField from "../confirmedPasswordField";

const Auth = forwardRef<RefsType, AuthType>(({
  hasEmail,
  hasPassword,
  title,
  handleSubmit,
  toAuthLinks,
  password,
  handlePasswordUpdate,
  handleConfirmedPasswordUpdate,
  validationStatuses,
  disableSubmit,
  removeStatusMessage,
  hasPasswordValidation,
  hasConfirmedPassword
}, {
  emailRef,
  passwordRef
}: any) => {
  return (
    <AuthWrapper>
      <AuthTitle id={AuthTransitionIdsEnum.TITLE}>
        { title }
      </AuthTitle>
      <Form>
        <AuthResMessage />
        {hasEmail && (
          <Fields id={AuthTransitionIdsEnum.EMAIL}>
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
        {hasConfirmedPassword && handleConfirmedPasswordUpdate && (
          <ConfirmedPasswordField handleUpdate={handleConfirmedPasswordUpdate} />
        )}
        <SubmitButton
          onClick={handleSubmit}
          disabled={disableSubmit} >
          Submit
        </SubmitButton>
      </Form>
      {toAuthLinks && (
        <ToAuthLinkWrapper id={AuthTransitionIdsEnum.TO_AUTH_LINKS}>
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