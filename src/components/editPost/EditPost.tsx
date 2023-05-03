import { FC } from "react";
import NewPost, { NewPostType } from "../newPost/NewPost";
import {
  AboluteEdit,
  EditPostStyled,
  Overlay
} from "./EditPost.styled";

type EditPostType = NewPostType & {
  baseContent: string
  descriptionContent: string
  handleTriggerEditView: () => void
}

const EditPost: FC<EditPostType> = ({
  baseRef,
  descriptionRef,
  baseContent,
  descriptionContent,
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
          baseContent={baseContent}
          descriptionContent={descriptionContent}
          handleSubmit={handleSubmit}
          formMessageProps={formMessageProps} />
      </AboluteEdit>
    </EditPostStyled>
  )
}

export default EditPost