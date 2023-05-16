import { forwardRef } from "react";
import {
  Author,
  BaseInformation,
  Date,
  PostDisplayStyled,
  Button,
  BaseSection,
  DescriptionSection,
  DescriptionContent,
  ButtonWrapper,
  PostDisplayContent
} from "./PostDisplay.styled";
import BubbleLayout from "../bubbleLayout";
import CleanContent from "../cleanContent";
import NormalLayout from "../normalLayout";
import FormMessageContainer from "../formMessage";
import { FormMessageContainerType } from "../formMessage/FormMessage.container";
import { Contents } from "../post/Post.type";

type PostDisplayType = {
  post: {
    username: string
    collectionPath: string
    post: Contents
    createdAt: string
    isAuthor?: boolean
  }
  handleRevealDescription: () => void
  handleTriggerEditView?: () => void
  handleTriggerDeleteView?: () => void
  formMessage?: FormMessageContainerType
}
type DescriptionSectionRefType = HTMLDivElement

const PostDisplay = forwardRef<DescriptionSectionRefType, PostDisplayType>(({
  post: {
    username,
    createdAt,
    collectionPath,
    isAuthor,
    post: {
      baseContent,
      descriptionContent
    }
  },
  handleRevealDescription,
  handleTriggerEditView,
  handleTriggerDeleteView,
  formMessage
}, descriptionRef) => {
  return (
    <PostDisplayStyled>
      <BubbleLayout>
        <BaseSection>
          <BaseInformation>
            {collectionPath && (
              <Author href={`/${collectionPath}`}>
                Author - { username }
              </Author>
            )}
            {createdAt && (
              <Date>
                createdAt - Uploaded
              </Date>
            )}
          </BaseInformation>
          {formMessage?.showMessage && (
            <FormMessageContainer
              message={formMessage.message}
              type={formMessage.type}
              showMessage={formMessage.showMessage} />
          )}
          <PostDisplayContent>
            <CleanContent content={baseContent} />
          </PostDisplayContent>
          {(descriptionContent || isAuthor) && (
            <ButtonWrapper>
              {descriptionContent && (
                <Button
                  colorType="primary"
                  onClick={handleRevealDescription} >
                  The Big Reveal!
                </Button>
              )}
              {isAuthor && (
                <>
                  <Button
                    colorType="primary"
                    onClick={handleTriggerEditView} >
                    Edit
                  </Button>
                  <Button
                    colorType="primary"
                    onClick={handleTriggerDeleteView} >
                    Delete
                  </Button>
                </>
              )}
            </ButtonWrapper>
          )}
        </BaseSection>
      </BubbleLayout>
      <NormalLayout>
        <DescriptionSection id='description-section'>
          <DescriptionContent ref={descriptionRef}>
            <PostDisplayContent>
              <CleanContent content={descriptionContent} />
            </PostDisplayContent>
          </DescriptionContent>
        </DescriptionSection>
      </NormalLayout>
    </PostDisplayStyled>
  )
})

PostDisplay.displayName = 'PostDisplay'

export default PostDisplay