import styled from 'styled-components';
import { Container } from '../../../../styled';

export const DesktopHeaderWrapper = styled.div`
  ${Container('xl')}
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PageList = styled.ul`
  display: flex;
`;

export const PageItem = styled.li`
  margin-right: 20px;
  
  &:last-child {
    margin: 0;
  }
`;