import styled, { css } from "styled-components";
import { StatusMessageColors } from "../../styled";
import { ResMessageType } from "../auth/Auth.types";

export const ResMessageWrapper = styled.div`
  height: 0;
  overflow: hidden;
`;

export const ResMessage = styled.p<ResMessageType>(({ statusType }) => {
  const statusTypsColors = statusType ? StatusMessageColors[statusType] : ''

  return css`
    ${statusTypsColors}
    display: inline-block;
    font-size: 12px;
    border-radius: 10px;
    padding: 20px;
  `
})