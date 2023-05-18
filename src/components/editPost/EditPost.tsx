import { FC, RefObject } from "react";
import { Overlay } from "../../styled/animation";
import NewPost, { NewPostType } from "../newPost/NewPost";
import { Contents } from "../post/Post.type";
import {
  AbsoluteEdit,
  EditPostStyled
} from "./EditPost.styled";

type EditPostType = NewPostType & {
  post: Contents
  handleCloseEdit: () => void
  overlayRef: RefObject<HTMLDivElement>
  absoluteRef: RefObject<HTMLDivElement>
}

const EditPost: FC<EditPostType> = ({
  baseRef,
  descriptionRef,
  post,
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
          isEdit />
      </AbsoluteEdit>
    </EditPostStyled>
  )
}

export default EditPost