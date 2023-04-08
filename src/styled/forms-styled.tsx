import styled, { css } from 'styled-components';

type FieldType = {
  isHidden?: boolean
}

export const Field = styled.div<FieldType>(({ isHidden }) => {
  return css`
    display: flex;
    position: relative;
    flex-direction: column;
    margin-top: ${isHidden ? '0' : '20px'};
    height: ${isHidden ? '0' : 'auto'};
    opacity: ${isHidden ? '0' : '1'};
    pointer-events: ${isHidden ? 'none' : 'initial'};

    &:first-child {
      margin: 0;
    }
  `
});

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const Textarea = styled.textarea`
  min-height: 120px;
`;