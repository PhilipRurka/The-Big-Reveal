import styled from 'styled-components';
import { Container, Fonts } from '../../styled';

export const PostStyled = styled.div`
  ${Container('lg')}
  ${Fonts.tiny}
  min-height: calc(100vh - 73px);
  padding-top: 40px;
`;