import { forwardRef } from "react";
import {
  AuthWrapper,
  AuthTitle,
  Form,
  ToAuthLinkWrapper,
  ToAuthLinkItem,
  SubmitButton
} from "./Auth.styled";
import Input from "../input";
import {
  AuthTransitionIdsEnum,
  AuthType,
  RefsType,
} from "./Auth.types";
import { Field, Label } from "../../styled";
import PasswordField from "../passwordField";
import AuthResMessage from "../authResMessage";
import ConfirmedPasswordField from "../confirmedPasswordField";
import { FormMessageContainerType } from "../authResMessage/FormMessage.container";
import FormMessage from "../authResMessage"

type FormMessagePropsType ={
  formMessageProps: FormMessageContainerType
}

const Auth = forwardRef<RefsType, AuthType & FormMessagePropsType>(({
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
  hasConfirmedPassword,
  formMessageProps
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
        <FormMessage {...formMessageProps} />
        {hasEmail && (
          <Field id={AuthTransitionIdsEnum.EMAIL}>
            <Label htmlFor="emailAddress">
              Email
            </Label>
            <Input
              id='emailAddress'
              type='text'
              handleChange={removeStatusMessage}
              ref={emailRef} />
          </Field>
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
          type='submit'
          colorType="primary"
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