import type { Contents } from "../post/Post.type";

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

type PostDisplayProps = {
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
}
type DescriptionSectionRefType = HTMLDivElement

const PostDisplay = forwardRef<DescriptionSectionRefType, PostDisplayProps>(({
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
  handleTriggerDeleteView
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
          <FormMessageContainer id='displayPostFormMessage' />
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