import styled from 'styled-components';
import { Container } from '../../styled';

export const PostWrapper = styled.div`
  ${Container('lg')}
  padding-top: 40px;

  h1 {
    font-size: 40px;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 30px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0;
  }

  span {
    font-size: 14px;
    margin-bottom: 40px;
  }

  p {
    padding-bottom: 20px;
  }
`;