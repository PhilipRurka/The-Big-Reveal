import styled from 'styled-components';

import Xcircle from '../../svgs/X-Circle';

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
  height: 300px;
  z-index: 1;
  padding: 20px;
  `;

export const DeleteModalHeader = styled.div`
  height: 50px;
  background: rgba(40, 40, 40, 1);
  `

export const ConfirmForm = styled.form`
  padding: 25px 0;
  font-size: 0.9rem;
`

export const Input = styled.input`
  &[type='text'] {
    font-weight: 500;
    border-radius: 5px;
    background: rgba(41, 19, 21, 1);
    width: 100%;
    padding: 13px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    color: rgba(199, 81, 86, 1);
    border: none;
    border: 1px solid rgba(106, 32, 36, 1);
    padding: 10px 0;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
  }
  input[type='text']:focus {
    border: 2px solid #555;
}
  &[type='submit'] {
    font-weight: 500;
    border-radius: 5px;
    background: rgba(41, 19, 21, 1);
    width: 100%;
    padding: 13px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    color: rgba(199, 81, 86, 1);
    border: none;
    border: 1px solid rgba(106, 32, 36, 1);
  }
  ::placeholder {
    color: rgba(199, 81, 86, 1);
    opacity: 1;
    padding: 10px;
  }
  &[type='submit']:disabled {
    background: rgba(41, 19, 21, 1);
      border: none;
  }
`;

export const DeleteButton = styled.button`
  margin: 20px 0px;
  cursor: pointer;
  font-weight: 500;
  padding: 13px 100px;
  border-radius: 5px;
  border: 1px solid rgba(106, 32, 36, 1);
  font-size: 0.9rem;
  color: rgba(199, 81, 86, 1);
  background: rgba(41, 19, 21, 1);
  transition: all 0.25s ease;
  `

export const CloseModalButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

export const CloseModalButton = styled(Xcircle)`
  
`