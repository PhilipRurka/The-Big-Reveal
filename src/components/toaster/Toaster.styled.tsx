import styled from 'styled-components';
import { default as LinkNext } from 'next/link'

const sharedContent = {
  'border-radius': '20px',
  'background-color': 'white',
  'padding': '14px',
  'box-shadow': '0 0 4px 0px black'
}

export const ToasterWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: calc(100% + 5px);
`;

export const StaticContent = styled.div`
  ${sharedContent}
`;

export const AnchorContent = styled(LinkNext)`
  ${sharedContent}
`;

export const Title = styled.span`
  font-size: 16px;
`;

export const Subtitle = styled.span`
  font-size: 14px;
  margin-top: 5px;
`;