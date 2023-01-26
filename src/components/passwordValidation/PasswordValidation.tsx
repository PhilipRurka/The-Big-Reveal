import { FC } from "react";
import { ItemsSuccessStatesType } from "../../hooks/usePasswordValidation";
import { PasswordValidationType } from "./PasswordValidation.container";
import {
  ConditionItem,
  ConditionList,
  ConditionsTitle,
  PasswordValidationWrapper
} from "./PasswordValidation.styled";

const PasswordValidation: FC<PasswordValidationType> = ({
  validationStatuses: {
    hasLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial
  }
}) => (
  <PasswordValidationWrapper>
    <ConditionsTitle>Must containe:</ConditionsTitle>
    <ConditionList>
      <ConditionItem isSuccess={hasLength} >
        atleast 8 characters
      </ConditionItem>
      <ConditionItem isSuccess={hasUppercase} >
        atleast 1 uppercase
      </ConditionItem>
      <ConditionItem isSuccess={hasLowercase} >
        atleast 1 lowercase
      </ConditionItem>
      <ConditionItem isSuccess={hasNumber} >
        atleast 1 number
      </ConditionItem>
      <ConditionItem isSuccess={hasSpecial} >
        atleast 1 special character
      </ConditionItem>
    </ConditionList>
  </PasswordValidationWrapper>
)

export default PasswordValidation