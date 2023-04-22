import styled from 'styled-components';
import { default as LinkNext } from 'next/link'

const sharedCardElementStyles = {
  'white-space': 'nowrap',
  'overflow': 'hidden',
  'text-overflow': 'ellipsis',
  'max-width': '400px'
}

export const PostCardWrapper = styled(LinkNext)`
  border-left: 3px solid black;
  padding-left: 15px;
  max-width: 400px;
  display: table;
  margin-top: 20px;
`;

export const Title = styled.span`
  ${sharedCardElementStyles}
  margin-bottom: 5px;
`;

export const Date = styled.span`
  ${sharedCardElementStyles}
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
`;

export const Author = styled.span`
  
`;