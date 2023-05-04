import styled from 'styled-components';

export const EditPostStyled = styled.div`

`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  cursor: pointer;
`;

export const AboluteEdit = styled.div`
  position: fixed;
  top: 73px;
  right: 0;
  bottom: 0;
  left: 100px;
  background-color: white;
  overflow-y: scroll;
  transform: translateX(100%);
`;