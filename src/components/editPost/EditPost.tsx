import { FC } from "react";
import { ContentsType } from "../../pages/post/[post-id]";
import NewPost, { NewPostType } from "../newPost/NewPost";
import {
  AboluteEdit,
  EditPostStyled,
  Overlay
} from "./EditPost.styled";

type EditPostType = NewPostType & {
  post: ContentsType
  handleTriggerEditView: () => void
}

const EditPost: FC<EditPostType> = ({
  baseRef,
  descriptionRef,
  post,
  formMessageProps,
  handleSubmit,
  handleTriggerEditView
}) => {
  return (
    <EditPostStyled>
      <Overlay onClick={handleTriggerEditView} />
      <AboluteEdit>
        <NewPost
          baseRef={baseRef}
          descriptionRef={descriptionRef}
          post={post}
          handleSubmit={handleSubmit}
          formMessageProps={formMessageProps}
          isEdit />
      </AboluteEdit>
    </EditPostStyled>
  )
}

export default EditPost