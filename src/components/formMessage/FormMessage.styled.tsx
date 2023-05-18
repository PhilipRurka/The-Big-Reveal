import styled, { css } from "styled-components";
import { StatusMessageColors } from "../../styled";
import { StatusMessageTypesEnum } from "./FormMessage.container";

type FormMessageWrapperType = {
  statusType: StatusMessageTypesEnum | null
}

export const FormMessageStyled = styled.div`
  height: 0;
  overflow: hidden;
`;

export const FormMessageWrapper = styled.p<FormMessageWrapperType>(({ statusType }) => {
  const statusTypsColors = statusType ? StatusMessageColors[statusType] : ''

  return css`
    ${statusTypsColors}
    display: inline-block;
    font-size: 12px;
    border-radius: 10px;
    padding: 20px;
  `
})