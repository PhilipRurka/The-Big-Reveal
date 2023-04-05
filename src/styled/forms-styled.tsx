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

export const DisabledField = styled.div` // Temporary
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  &::before {
    content: 'Coming Soon';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 20px;
  }
`;