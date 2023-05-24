import { FC, RefObject } from "react";
import { Overlay } from "../../styled/animation";
import {
  AbsoluteDeleteWrapper,
  DeletePostModalStyled,
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
  return (
    <DeletePostModalStyled>
      <Overlay
        ref={overlayRef}
        onClick={handleCloseDelete} />
      <AbsoluteDeleteWrapper ref={absoluteRef}>
        <h1>{ decodedTitle }</h1>
        <button onClick={handleDeletePost}>
          Delete
        </button>
      </AbsoluteDeleteWrapper>
    </DeletePostModalStyled>
  )
}

export default DeletePostModal