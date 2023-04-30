import styled from 'styled-components';
import { BreakObj, Container } from '../../../../styled';

export const DesktopHeaderStyled = styled.div`
  ${Container('xl')}
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PageList = styled.ul`
  display: flex;

  ${BreakObj.xs.breakpoint.media} {
    display: none
  }
`;

export const PageItem = styled.li`
  margin-right: 20px;
  
  &:last-child {
    margin: 0;
  }
`;