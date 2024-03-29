import type { FC, RefObject } from "react";
import type { NewPostType } from "../newPost/NewPost";
import type { Contents } from "../post/Post.type";

import { Overlay } from "../../styled/animation";
import NewPost from "../newPost/NewPost";
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