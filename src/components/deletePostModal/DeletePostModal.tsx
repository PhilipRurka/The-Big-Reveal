import type { FC, RefObject, SetStateAction } from "react";
import { useCallback, useMemo, useState } from 'react';
import { Overlay } from "../../styled/animation";
import {
  AbsoluteDeleteWrapper,
  DeletePostModalStyled,
  DeleteButton,
  DeleteModalHeader,
  ConfirmForm,
  Input,
  CloseModalButton,
  CloseModalButtonWrapper
} from "./DeletePostModal.styled";

type DeletePostModalType = {
  decodedTitle: string
  overlayRef: RefObject<HTMLDivElement>
  absoluteRef: RefObject<HTMLDivElement>
  handleCloseDelete: () => void
  handleDeletePost: () => void
}

const DeletePostModal: FC<DeletePostModalType> = ({
  decodedTitle,
  overlayRef,
  absoluteRef,
  handleDeletePost,
  handleCloseDelete
}) => {

  const [val, setVal] = useState('')

  // useCallback won't re-render the value 
  const inputChange = useCallback((event: { target: { value: SetStateAction<string>; }; }) => {
    setVal(event.target.value);
  }, [])

  const isDisabled = useMemo(() => {
    const titleLowerCase = decodedTitle.toLocaleLowerCase()
    const valLowerCase = val.toLocaleLowerCase()

    return titleLowerCase === valLowerCase ? false : true;

  }, [val, decodedTitle])
  
  const click = (event:any) => {
    event.preventDefault();
    console.log(val);
  }

  console.log(isDisabled);
  
  return (
    <DeletePostModalStyled>
      <Overlay
        ref={overlayRef}
        onClick={handleCloseDelete} />
      <AbsoluteDeleteWrapper ref={absoluteRef}>
          <CloseModalButtonWrapper
            onClick={handleCloseDelete} >
            <CloseModalButton color="white"/>
          </CloseModalButtonWrapper>
          <DeleteModalHeader>
            <h1>Delete Poem</h1>
          </DeleteModalHeader>
        <h2>{ decodedTitle }</h2>
        <ConfirmForm>
          <label htmlFor='confirm'>
            Type name of poem to confirm
          </label>
          <Input 
            type='text' 
            id='confirm' 
            name='confirm' 
            onChange={inputChange}
            />
          <DeleteButton
            disabled={isDisabled}
            onClick={click} >
              Delete Poem
          </DeleteButton>
        </ConfirmForm>
      </AbsoluteDeleteWrapper>
    </DeletePostModalStyled>
  )
}

export default DeletePostModal