import styled from 'styled-components';
import { default as LinkNext } from 'next/link'

const sharedContent = {
  'border-radius': '20px',
  'background-color': 'white',
  'padding': '14px'
}

export const ToasterWrapper = styled.div`
  position: fixed;
  white-space: nowrap;
  z-index: 2;
  display: inline-block;
  top: 30px;
  left: 100%;
  border-radius: 20px;
  transform: translate(40px, 0);
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