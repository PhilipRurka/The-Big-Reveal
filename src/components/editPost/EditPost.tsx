import { FC, RefObject } from "react";
import { ContentsType } from "../../pages/post/[post-id]";
import { Overlay } from "../../styled/animation";
import NewPost, { NewPostType } from "../newPost/NewPost";
import {
  AbsoluteEdit,
  EditPostStyled
} from "./EditPost.styled";

type EditPostType = NewPostType & {
  post: ContentsType
  handleCloseEdit: () => void
  overlayRef: RefObject<HTMLDivElement>
  absoluteRef: RefObject<HTMLDivElement>
}

const EditPost: FC<EditPostType> = ({
  baseRef,
  descriptionRef,
  post,
  formMessageProps,
  handleSubmit,
  handleCloseEdit,
  overlayRef,
  absoluteRef
}) => {
  return (
    <EditPostStyled>
      <Overlay
        ref={overlayRef}
        onClick={handleCloseEdit} />
      <AbsoluteEdit ref={absoluteRef} >
        <NewPost
          baseRef={baseRef}
          descriptionRef={descriptionRef}
          post={post}
          handleSubmit={handleSubmit}
          formMessageProps={formMessageProps}
          isEdit />
      </AbsoluteEdit>
    </EditPostStyled>
  )
}

export default EditPost