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
  ButtonWrapper
} from "./PostDisplay.styled";
import BubbleLayout from "../bubbleLayout";
import CleanContent from "../cleanContent";
import NormalLayout from "../normalLayout";
import dayjs from "dayjs";
import { ContentsType } from "../../pages/post/[post-id]";

type PostDisplayType = {
  username: string
  profilePath: string
  post: ContentsType
  created_at: string
  handleRevealDescription: () => void
  isAuthor?: boolean
  handleTriggerEditView?: () => void
}
type DescriptionSectionRefType = HTMLDivElement

const PostDisplay = forwardRef<DescriptionSectionRefType, PostDisplayType>(({
  username,
  created_at,
  post: {
    baseContent,
    descriptionContent
  },
  handleRevealDescription,
  profilePath,
  isAuthor,
  handleTriggerEditView
}, descriptionRef) => {
  return (
    <PostDisplayStyled>
      <BubbleLayout>
        <BaseSection>
          <BaseInformation>
            {profilePath && (
              <Author href={`/${profilePath}`}>
                Author - { username }
              </Author>
            )}
            {created_at && (
              <Date>
                { dayjs(created_at).format('D MMM YYYY, h:ss a') } - Uploaded
              </Date>
            )}
          </BaseInformation>
          <CleanContent content={baseContent} />
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
                <Button
                  colorType="primary"
                  onClick={handleTriggerEditView} >
                  Edit
                </Button>
              )}
            </ButtonWrapper>
          )}
        </BaseSection>
      </BubbleLayout>
      <NormalLayout>
        <DescriptionSection id='description-section'>
          <DescriptionContent ref={descriptionRef}>
            <CleanContent content={descriptionContent} />
          </DescriptionContent>
        </DescriptionSection>
      </NormalLayout>
    </PostDisplayStyled>
  )
})

PostDisplay.displayName = 'PostDisplay'

export default PostDisplay