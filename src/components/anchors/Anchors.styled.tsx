import styled from "styled-components";
import { default as LinkNext } from 'next/link'
import { Colors } from "../../styled";

type AnchorMainWrapperType = {
  isActive?: boolean
}

export const AnchorMainWrapper = styled.div<AnchorMainWrapperType>`
  a,
  span {
    color: ${props => props.isActive ? Colors.eucalyptus : 'initial'};

    &:hover {
      color: ${Colors.persimmon};
    }

    &:active {
      color: ${Colors.dodger};
    }
  }
`;

export const AnchorMainLink = styled(LinkNext)``;

export const AnchorMainTrigger = styled.span`
  cursor: pointer;
`