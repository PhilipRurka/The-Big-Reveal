import type {
  AuthProps,
  Refs,
} from "./Auth.type";

import { forwardRef } from "react";
import {
  AuthStyled,
  AuthTitle,
  Form,
  ToAuthLinkStyled,
  ToAuthLinkItem,
  SubmitButton,
  FieldContainer,
} from "./Auth.styled";
import Input from "../input";
import { Field, Label } from "../../styled";
import PasswordField from "../passwordField";
import ConfirmedPasswordField from "../confirmedPasswordField";
import EasyLogin from "../easyLogin";
import { AuthTransitionIdsEnum } from "./Auth.enum";
import FormMessageContainer from "../formMessage";

const Auth = forwardRef<Refs, AuthProps>(({
  hasEmail,
  hasPassword,
  hasUsername,
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
  passwordRef, 
  usernameRef 
}: any) => {
  return (
    <AuthStyled>
      <AuthTitle id={AuthTransitionIdsEnum.TITLE}>
        { title }
      </AuthTitle>
      <Form>
        <FormMessageContainer id='authFormMessage' />
        <FieldContainer id={AuthTransitionIdsEnum.USERNAME}>
          {hasUsername && (
            <Field>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                type='text'
                handleChange={removeStatusMessage}
                ref={usernameRef}
              />
            </Field>
          )}
        </FieldContainer>
        <FieldContainer id={AuthTransitionIdsEnum.EMAIL}>
          {hasEmail && (
            <Field>
              <Label htmlFor='emailAddress'>
                Email
              </Label>
              <Input
                id='emailAddress'
                type='text'
                handleChange={removeStatusMessage}
                ref={emailRef} />
            </Field>
          )}
        </FieldContainer>
        <PasswordField
          ref={passwordRef}
          password={password}
          hasPasswordValidation={hasPasswordValidation}
          handlePasswordUpdate={handlePasswordUpdate}
          validationStatuses={validationStatuses}
          hasPassword={hasPassword} />
        {hasConfirmedPassword && handleConfirmedPasswordUpdate && (
          <ConfirmedPasswordField
            handleUpdate={handleConfirmedPasswordUpdate} />
        )}
        {/* {process.env.NODE_ENV === 'development' && ( */}
          <EasyLogin 
            emailRef={emailRef} 
            passwordRef={passwordRef} 
          />
        {/* )} */}
        <SubmitButton
          type='submit'
          colorType='primary'
          onClick={handleSubmit}
          disabled={disableSubmit} >
          Submit
        </SubmitButton>
      </Form>
      {toAuthLinks && (
        <ToAuthLinkStyled id={AuthTransitionIdsEnum.TO_AUTH_LINKS}>
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
        </ToAuthLinkStyled>
      )}
    </AuthStyled>
  )
})

Auth.displayName = 'Auth'

export default Auth