import { forwardRef } from "react";
import {
  Author,
  BaseInformation,
  Date,
  PostDisplayWrapper,
  Button,
  BaseSection,
  DescriptionSection,
  DescriptionContent
} from "./PostDisplay.styled";
import BubbleLayout from "../bubbleLayout";
import { PostType } from "../post/Post";
import CleanContent from "../cleanContent";
import NormalLayout from "../normalLayout";
import dayjs from "dayjs";

type PostDisplayType = PostType & {
  handleRevealDescription: () => void
}
type DescriptionSectionRefType = HTMLDivElement

const PostDisplay = forwardRef<DescriptionSectionRefType, PostDisplayType>(({
  author_username,
  created_at,
  cleanBase,
  cleanDescription,
  handleRevealDescription
}, descriptionRef) => {
  return (
    <PostDisplayWrapper>
      <BubbleLayout>
        <BaseSection>
          <BaseInformation>
            <Author>
              Author - { author_username }
            </Author>
            <Date>
              { dayjs(created_at).format('D MMM YYYY, h:ss a') } - Uploaded
            </Date>
          </BaseInformation>
          <CleanContent content={cleanBase} />
          <Button
            colorType="primary"
            onClick={handleRevealDescription} >
            The Big Reveal!
          </Button>
        </BaseSection>
      </BubbleLayout>
      <NormalLayout>
        <DescriptionSection id='description-section'>
          <DescriptionContent ref={descriptionRef}>
            <CleanContent content={cleanDescription} />
          </DescriptionContent>
        </DescriptionSection>
      </NormalLayout>
    </PostDisplayWrapper>
  )
})

export default PostDisplay