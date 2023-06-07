import styled from 'styled-components';

import Xcircle from '../../svgs/X-Circle';
import AlertCircle from '../../svgs/Alert-Circle'
import AlertTriangle from '../../svgs/Alert-Triangle';

export const DeletePostModalStyled = styled.div`

`;

export const AbsoluteDeleteWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: rgba(35, 35, 35 ,1);
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
  background: rgba(40, 40, 40, 1);
  border-bottom: rgba(45, 45, 45, 1);
  
  > .title {
    font-size: 1rem;
    padding: 12px 0 0 10px;
  } 
  `

export const ConfirmForm = styled.form`
  padding: 25px 0;
  font-size: 0.8rem;

  > .title {
    padding: 8px 0 20px 0;
    font-size: 0.9rem;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Input = styled.input`
  &[type='text'] {
    flex: 1 0;
    min-width: 50px;
    min-height: 25px;
    font-size: inherit;
    font-weight: 500;
    padding-left: 5px;
    background: rgba(41, 19, 21, 1);
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    color: rgba(199, 81, 86, 1);
    border: 1px solid rgba(106, 32, 36, 1);
    border-radius: 5px;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
  
  }
  ::placeholder {
    color: rgba(199, 81, 86, 1);
    opacity: 0.5;
    padding: 10px 0;
    font-size: 0.8rem;
    background-color: transparent;
  }
  &:link {
    background: rgba(41, 19, 21, 1);
  }
  &:visited {
    background: rgba(41, 19, 21, 1);
  }
  &:hover {
    background: rgba(41, 19, 21, 1);
  }
  &:focus {
    outline: none;
    background-color: none;
  }
  &:active {
    background: rgba(41, 19, 21, 1);
  }
`

export const DeleteButton = styled.button`
  width: 100%;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 12px 50px;
  margin: 25px 0px;
  border: 1px solid rgba(106, 32, 36, 1);
  border-radius: 5px;
  color: rgba(199, 81, 86, 1);
  background: rgba(41, 19, 21, 1);
  transition: all 0.25s ease;
  
  &:disabled {
    cursor: not-allowed;
    background: rgba(41, 19, 21, 1);
  }

  &:not([disabled]):hover {
    background: rgba(199, 81, 86, 0.8);
    color: white;
  }
  `

export const CloseModalButtonWrapper = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;
  color: white;
  position: absolute;
  top: -12px;
  right: -12px;
`

export const CloseModalButton = styled(Xcircle)`
  
`
export const AlertModalCircleWrapper = styled.div`
  flex: 0 0;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 67%;
  right: 10%;
`
export const AlertModalCircle = styled(AlertCircle)`
`

export const AlertModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  background: rgba(32, 19, 2, 1);
  border: 1px solid rgba(87, 54, 6, 1);
  border-radius: 5px;
  position: relative;
  top: 0;
  left: 0;
`

export const AlertModalMessage = styled.div`
  font-size: 0.6rem;
  width: 80%;
  padding: 15px 0 0 15px;
`

export const AlertModalTriangleWrapper = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
`

export const AlertModalTriangle = styled(AlertTriangle)`

`