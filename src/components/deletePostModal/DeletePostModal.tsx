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
  handleInputChange: () => void
  handleIsDisabled: () => void
}

const DeletePostModal: FC<DeletePostModalType> = ({
  decodedTitle,
  overlayRef,
  absoluteRef,
  handleDeletePost,
  handleCloseDelete,
  handleInputChange,
  handleIsDisabled
}) => {
  
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
        <ConfirmForm>
          <p>This will delete your poem:</p>
          <h2 className="title">{ decodedTitle }</h2>
          <label htmlFor='confirm'>
            <p>Type name of poem to confirm.</p>
          </label>
          <Input 
            type='text' 
            id='confirm' 
            name='confirm' 
            placeholder="Type in name of poem"
            onChange={handleInputChange}
            />
          <DeleteButton
            disabled={handleIsDisabled}
            onClick={handleDeletePost} >
              Delete Poem
          </DeleteButton>
        </ConfirmForm>
      </AbsoluteDeleteWrapper>
    </DeletePostModalStyled>
  )
}

export default DeletePostModal