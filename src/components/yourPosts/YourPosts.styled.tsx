import styled from 'styled-components';
import { Container } from '../../styled';
import { default as LinkNext } from 'next/link'

const sharedCardElementStyles = {
  'white-space': 'nowrap',
  'overflow': 'hidden',
  'text-overflow': 'ellipsis',
  'max-width': '400px'
}

export const YourPostsWrapper = styled.div`
  ${Container('lg')}
  margin-top: 50px;
`;

export const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 10px;
`;

export const Card = styled(LinkNext)`
  border-left: 3px solid black;
  padding-left: 15px;
  max-width: 400px;
  display: table;
  margin-top: 20px;
`;

export const CardTitle = styled.span`
  ${sharedCardElementStyles}
  margin-bottom: 5px;
`;

export const CreatedAt = styled.span`
  ${sharedCardElementStyles}
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
`;

export const Author = styled.span`
  
`;