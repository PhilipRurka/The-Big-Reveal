import styled from 'styled-components';

type FieldsType = {
  hide?: boolean
}

export const Fields = styled.div<FieldsType>`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: ${props => props.hide ? '0' : '20px'};
  height: ${props => props.hide ? '0' : 'auto'};
  opacity: ${props => props.hide ? '0' : '1'};
  /* pointer-events: ${props => props.hide ? 'none' : 'auto'}; */

  &:first-child {
    margin: 0;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;