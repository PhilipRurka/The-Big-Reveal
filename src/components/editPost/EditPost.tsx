import { FC } from "react";
import NewPostContainer from "../newPost/NewPost.container";
import {
  AboluteEdit,
  EditPostStyled,
  Overlay
} from "./EditPost.styled";

type EditPostType = {
  baseContent: string
  descriptionContent: string
  handleTriggerEditView: () => void
}

const EditPost: FC<EditPostType> = ({
  baseContent,
  descriptionContent,
  handleTriggerEditView
}) => {
  return (
    <EditPostStyled>
      <Overlay onClick={handleTriggerEditView} />
      <AboluteEdit>
        <NewPostContainer
          baseContent={baseContent}
          descriptionContent={descriptionContent} />
      </AboluteEdit>
    </EditPostStyled>
  )
}

export default EditPost