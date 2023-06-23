import styled from 'styled-components';
import { Colors } from '../../styled';

import { AlertCircle } from '../../svgs';
import { AlertTriangle } from '../../svgs';
import { Xcircle } from '../../svgs';

export const DeletePostModalStyled = styled.div`

`;

export const AbsoluteDeleteWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: ${Colors.mineShaftTwo};
  width: 300px;
  height: 350px;
  z-index: 1;
  padding: 20px;
  border-radius: 5px;
`;

export const DeleteModalHeader = styled.div`
  width: 100%;
  height: 40px;
  margin: 0 0 15px 0;
  background: ${Colors.mineShaft};
  border-bottom: ${Colors.Tundora};
  
  > .title {
    font-size: 1rem;
    padding: 12px 0 0 10px;
    }  
`;

export const ConfirmForm = styled.form`
  padding: 25px 0;
  font-size: 0.8rem;

  > .title {
    padding: 8px 0 20px 0;
    font-size: 0.9rem;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.input`
  &[type='text'] {
    flex: 1 0;
    min-width: 50px;
    min-height: 25px;
    font-size: inherit;
    font-weight: 500;
    background-color: ${Colors.gondola};
    padding: 12px 20px;
    margin: 8px 0;
    color: ${Colors.fuzzyWuzzy};
    border: 1px solid ${Colors.crownOfThorns};
    border-radius: 5px;
    transition: 0.5s;
    outline: none;
  
  }
  ::placeholder {
    color: ${Colors.fuzzyWuzzy};
    opacity: 0.5;
    padding: 10px 0;
    font-size: 0.8rem;
    background-color: transparent;
  }
`;

export const DeleteButton = styled.button`
  width: 100%;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 12px 50px;
  margin: 25px 0px;
  border: 1px solid ${Colors.crownOfThorns};
  border-radius: 5px;
  color: ${Colors.fuzzyWuzzy};
  background: ${Colors.gondola};
  transition: all 0.25s ease;
  
  &:disabled {
    cursor: not-allowed;
    background: ${Colors.gondola};
  }

  &:not([disabled]):hover {
    background: ${Colors.fuzzyWuzzy};
    color: white;
  }
`;

export const CloseModalButtonWrapper = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;
  color: white;
  position: absolute;
  top: -12px;
  right: -12px;
`;

export const CloseModalButton = styled(Xcircle)`

`;

export const AlertModalCircleWrapper = styled.div`
  flex: 0 0;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 67%;
  right: 10%;
`;
export const AlertModalCircle = styled(AlertCircle)`

`;

export const AlertModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  background: ${Colors.kilamanjaro};
  border: 1px solid ${Colors.deepBronze};
  border-radius: 5px;
  position: relative;
  top: 0;
  left: 0;
`;

export const AlertModalMessage = styled.div`
  font-size: 0.6rem;
  width: 80%;
  padding: 15px 0 0 15px;
`;

export const AlertModalTriangleWrapper = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const AlertModalTriangle = styled(AlertTriangle)`

`;