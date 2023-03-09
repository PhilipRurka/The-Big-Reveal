import styled, { css } from "styled-components";
import { StatusMessageColors } from "../../styled";
import { ErrorMessageType } from "../auth/Auth.types";

export const ErrorMessageWrapper = styled.div`
  overflow: hidden;
`;

export const ErrorMessage = styled.p<ErrorMessageType>(({ statusType }) => {
  const statusTypsColors = statusType ? StatusMessageColors[statusType] : ''

  return css`
    ${statusTypsColors}
    display: inline-block;
    font-size: 12px;
    border-radius: 10px;
    padding: 20px;
  `
})