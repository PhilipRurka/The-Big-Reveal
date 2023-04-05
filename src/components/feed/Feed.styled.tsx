import styled from 'styled-components';
import { Container } from '../../styled';

export const FeedWrapper = styled.div`
  ${Container('lg')}
  margin-top: 50px;
  
  a + a {
    margin-top: 10px
  }
`;