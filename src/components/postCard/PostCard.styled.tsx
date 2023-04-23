import styled from 'styled-components';
import { default as LinkNext } from 'next/link'

const sharedCardElementStyles = {
  'white-space': 'nowrap',
  'overflow': 'hidden',
  'text-overflow': 'ellipsis',
  'max-width': '400px',
  'padding-left': '15px'
}

export const PostCardWrapper = styled(LinkNext)`
  border-left: 3px solid black;
  max-width: 400px;
  display: table;
  margin-top: 40px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Title = styled.span`
  ${sharedCardElementStyles}
  position: relative;
  padding-bottom: 10px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
  }
`;

export const Author = styled.span`
  ${sharedCardElementStyles}
  font-size: 14px;
  letter-spacing: 0.5px;
  margin-top: 10px;
`;

export const Date = styled.span`
  ${sharedCardElementStyles}
  margin-top: 5px;
  font-size: 14px;
  font-weight: 300;
`;