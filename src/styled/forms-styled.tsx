import styled from 'styled-components';

type FieldsType = {
  hide: boolean
}

export const Fields = styled.div<FieldsType>`
  display: ${props => props.hide ? 'none' : 'flex'};
  position: relative;
  flex-direction: column;
  margin-top: 20px;
  /* pointer-events: ${props => props.hide ? 'none' : 'auto'}; */

  &:first-child {
    margin: 0;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;