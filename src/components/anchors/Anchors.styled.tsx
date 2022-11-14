import styled from "styled-components";
import { default as LinkNext } from 'next/link'
import { Colors } from "../../styled";

type AnchorMainWrapperType = {
  isActive: boolean
}

export const AnchorMainWrapper = styled(({
  isActive,
  ...props
}) => (
  <LinkNext {...props} />
))<AnchorMainWrapperType>`
  color: ${props => props.isActive ? Colors.eucalyptus : 'initial'};

  &:hover {
    color: ${Colors.persimmon};
  }

  &:active {
    color: ${Colors.dodger};
  }
`;