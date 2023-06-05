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
  CloseModalButtonWrapper,
  AlertModalCircle,
  AlertModalCircleWrapper,
  AlertModalTriangle,
  AlertModalTriangleWrapper,
  AlertModalWrapper,
  AlertModalMessage,
  InputWrapper
} from "./DeletePostModal.styled";

type DeletePostModalType = {
  decodedTitle: string
  overlayRef: RefObject<HTMLDivElement>
  absoluteRef: RefObject<HTMLDivElement>
  handleCloseDelete: () => void
  handleDeletePost: () => void
  handleInputChange: (event: any) => void
  handleIsDisabled: boolean
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
            <h2 className="title">Delete Poem</h2>
          </DeleteModalHeader>
          <AlertModalWrapper>
            <AlertModalMessage>
              <p>You cannot recover this poem once it is deleted!</p>
            <AlertModalTriangleWrapper>
              <AlertModalTriangle color='rgba(200, 139, 28, 1)' />
            </AlertModalTriangleWrapper>
            </AlertModalMessage>
          </AlertModalWrapper>
        <ConfirmForm>
          <p>This will delete your poem:</p>
          <h2 className="title">{ decodedTitle }</h2>
          <label htmlFor='confirm'>
            <p>Type name of poem to confirm.</p>
          </label>
          <InputWrapper>
            <Input 
              type='text' 
              id='confirm' 
              name='confirm' 
              placeholder="Type in name of poem"
              onChange={handleInputChange}
              />
              <AlertModalCircleWrapper>
                <AlertModalCircle color='rgba(199, 81, 86, 1)'/>
              </AlertModalCircleWrapper>
          </InputWrapper>
          <DeleteButton className='hover'
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