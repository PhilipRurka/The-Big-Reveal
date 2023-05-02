import { forwardRef } from "react";
import {
  Author,
  BaseInformation,
  Date,
  PostDisplayStyled,
  Button,
  BaseSection,
  DescriptionSection,
  DescriptionContent
} from "./PostDisplay.styled";
import BubbleLayout from "../bubbleLayout";
import CleanContent from "../cleanContent";
import NormalLayout from "../normalLayout";
import dayjs from "dayjs";
import { PostDataType } from "../../pages/post/[post-id]";

type PostDisplayType = PostDataType & {
  handleRevealDescription: () => void
}
type DescriptionSectionRefType = HTMLDivElement

const PostDisplay = forwardRef<DescriptionSectionRefType, PostDisplayType>(({
  username,
  created_at,
  baseContent,
  descriptionContent,
  handleRevealDescription,
  profilePath
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
          {descriptionContent && (
            <Button
              colorType="primary"
              onClick={handleRevealDescription} >
              The Big Reveal!
            </Button>
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